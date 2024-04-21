# Use the specified Vespa image
FROM vespaengine/vespa:8.277.17

# Set the working directory
WORKDIR /opt/vespa

# Change to vespa user before running the script
USER vespa

# Copy the custom startup script to the container and make it executable in one step
COPY --chmod=755 --chown=vespa:vespa start-vespa.sh /usr/local/bin/start-vespa.sh

# Switch to vespa user
USER vespa

# Define the volume that will be used to store data
VOLUME ["/opt/vespa/var"]

# Expose ports used by Vespa for external access
EXPOSE 19071 8081

# Set the script as the entry point
ENTRYPOINT ["/usr/local/bin/start-vespa.sh", "configserver,services"]
