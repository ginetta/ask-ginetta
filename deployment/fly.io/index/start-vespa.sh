#!/bin/bash

# Check the current vm.max_map_count
current_max_map=$(sysctl -n vm.max_map_count)
required_max_map=262144

echo "Current max_map_count is: $current_max_map"

if [ "$current_max_map" -lt "$required_max_map" ]; then
    echo "Warning: vm.max_map_count is less than $required_max_map, which may affect performance."
    echo "Attempting to set vm.max_map_count to $required_max_map..."

    su -c "sysctl -w vm.max_map_count=$required_max_map"

    echo "Done! vm.max_map_count is now set to $required_max_map."
fi

# Start Vespa's config server and services
/opt/vespa/bin/vespa-start-configserver && /opt/vespa/bin/vespa-start-services

# Keep the container running
tail -f /dev/null
