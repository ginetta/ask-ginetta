# Use the specified Vespa image
FROM vespaengine/vespa:8.277.17

COPY --chmod=644 limits.conf /etc/security/limits.d/vespa.conf

# Set the working directory
WORKDIR /opt/vespa

# Copy the custom startup script to the container and make it executable in one step
COPY --chmod=755 --chown=vespa start-vespa.sh /usr/local/bin/start-vespa.sh

# Define the volume that will be used to store Vespa data
VOLUME ["/opt/vespa/var"]

# Expose ports used by Vespa for external access
EXPOSE 19071 8081

ENTRYPOINT ["/usr/local/bin/start-vespa.sh", "configserver,services"]
