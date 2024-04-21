#!/bin/bash

# Try to set ulimits
ulimit -n 262144 || echo "Failed to set nofile limit"
ulimit -u 409600 || echo "Failed to set nproc limit"
ulimit -c unlimited || echo "Failed to set core limit"

# Start Vespa configuration server and services
if [ "$1" == "configserver" ]; then
  echo "Starting Vespa Config Server..."
  /opt/vespa/bin/vespa-start-configserver
elif [ "$1" == "services" ]; then
  echo "Starting Vespa Services..."
  /opt/vespa/bin/vespa-start-services
elif [ "$1" == "configserver,services" ]; then
  echo "Starting Vespa Config Server and Services..."
  /opt/vespa/bin/vespa-start-configserver && /opt/vespa/bin/vespa-start-services
else
  echo "Allowed arguments to entrypoint are 'configserver', 'services' or 'configserver,services'."
  exit 1
fi
