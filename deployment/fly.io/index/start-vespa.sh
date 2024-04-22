#!/bin/bash

# Check the current vm.max_map_count
current_max_map=$(sysctl -n vm.max_map_count)
echo "Current max_map_count is: $current_max_map"

# Start Vespa's config server and services
# /opt/vespa/bin/vespa-start-configserver && /opt/vespa/bin/vespa-start-services

cat <<'EOF'
:::::::::::::::::::::::::::::::::::::
::: To finalize the deployment,     :::
::: ssh into the Vespa container   :::
::: and run the following command :::
:::::::::::::::::::::::::::::::::::::

# [BEGIN COMMAND]
su
echo "vm.max_map_count=262144" > /etc/sysctl.d/60-vespa.conf
sysctl -p /etc/sysctl.d/60-vespa.conf
exit
# [END COMMAND]

EOF

# Start Vespa's config server and services
/opt/vespa/bin/vespa-start-configserver && /opt/vespa/bin/vespa-start-services

# Keep the container running
tail -f /dev/null
