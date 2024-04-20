#!/bin/bash
# Custom startup script for Vespa

# Placeholder for any setup or pre-start conditions
echo "Checking pre-start conditions..."
# Add any actual checks or initialization here

# Start Vespa services
echo "Starting Vespa services..."
# Here, you'd normally call Vespa's internal commands to start services. However, since this is generally handled by Vespa's own Docker setup, we use a general command to keep Vespa running.
# The real command should be adjusted based on how Vespa's services are normally initialized.

/opt/vespa/bin/vespa-start-services &

# Keep the container running (this is a simple loop; adjust based on actual needs)
while true; do
    sleep 60
done
