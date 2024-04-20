# Use the official Vespa image as the base
FROM vespaengine/vespa:8.277.17

# Expose the ports Vespa uses
EXPOSE 19071 8081

# Create a directory that mimics the Docker Compose volume
RUN mkdir -p /opt/vespa/var
VOLUME ["/opt/vespa/var"]

# Environment variables for the logging system
ENV LOG_MAX_SIZE=50m \
  LOG_MAX_FILE=6

# Copy the custom startup script to the container and make it executable in one step
COPY --chmod=755 start-vespa.sh /usr/local/bin/start-vespa.sh

# Set the custom script as the entrypoint
ENTRYPOINT ["/usr/local/bin/start-vespa.sh"]
