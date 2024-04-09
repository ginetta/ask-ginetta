##
# /!\ This Dockerfile is made for the Fly.io, to be run from the root directory of the project
# through command flyctl deploy --config backend/deployment/fly.io/model_server/fly.toml
##

# Use an official Python runtime as a parent image
FROM python:3.11.7-slim-bookworm

# Install system dependencies required for your models and application
RUN apt-get update && \
  apt-get install -y --no-install-recommends curl ca-certificates && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /application

# Install Python dependencies
# The path is now relative to the root directory

COPY backend/requirements/default.txt /application/default_requirement.txt
COPY backend/requirements/model_server.txt /application/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /application/default_requirement.txt
RUN pip install --no-cache-dir --upgrade -r /application/requirements.txt

# Install Playwright if needed by your model server for browser automation
RUN playwright install chromium && playwright install-deps chromium

# Copy over any necessary application files or directories
# Path is now relative to the root directory
COPY backend/model_server /application/model_server

# Set environment variables for the model server configuration
ENV DOCUMENT_ENCODER_MODEL=${DOCUMENT_ENCODER_MODEL:-}
ENV NORMALIZE_EMBEDDINGS=${NORMALIZE_EMBEDDINGS:-}
ENV MIN_THREADS_ML_MODELS=${MIN_THREADS_ML_MODELS:-}
ENV LOG_LEVEL=${LOG_LEVEL:-info}

# Make port 9000 available to the world outside this container
EXPOSE 9000

# Define the command to run the model server
CMD ["uvicorn", "model_server.main:app", "--host", "0.0.0.0", "--port", "9000"]
