##
# /!\ This Dockerfile is made for the Fly.io, to be run from the root directory of the project
# through command flyctl deploy --config backend/deployment/fly.io/model_server/fly.toml
##

# Use an official Python runtime as a parent image
FROM python:3.11.7-slim-bookworm

# Default DANSWER_VERSION, typically overriden during builds by GitHub Actions.
ARG DANSWER_VERSION=0.3-dev
ENV DANSWER_VERSION=${DANSWER_VERSION}
RUN echo "DANSWER_VERSION: ${DANSWER_VERSION}"

ARG MIN_THREADS_ML_MODELS
ENV MIN_THREADS_ML_MODELS=${MIN_THREADS_ML_MODELS:-}

ARG LOG_LEVEL
ENV LOG_LEVEL=${LOG_LEVEL:-info}

# For the index model server only.
ARG INDEXING_ONLY
ENV INDEXING_ONLY=${INDEXING_ONLY:-True}

# Install the CPU versions of torch and torchvision directly
# to save on space. This is a workaround for the large size of the
# build image when using the regular torch and torchvision packages
# and their GPU dependencies.
RUN python -m pip install torch==2.0.1+cpu torchvision==0.15.2+cpu --index-url https://download.pytorch.org/whl/cpu

COPY backend/requirements/model_server.txt /tmp/requirements.txt

# /!\ Key difference with the snippet from ask-ginetta/backend/Dockerfile.model_server here.
# Remove original (GPU) torch and torchvision from the requirements file
RUN sed -i '/torch==2.0.1/d' /tmp/requirements.txt && \
  sed -i '/torchvision==0.15.2/d' /tmp/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

RUN apt-get remove -y --allow-remove-essential perl-base && \
  apt-get autoremove -y

WORKDIR /app

# Utils used by model server
COPY backend/danswer/utils/logger.py /app/danswer/utils/logger.py

# Place to fetch version information
COPY backend/danswer/__init__.py /app/danswer/__init__.py

# Shared between Danswer Backend and Model Server
COPY backend/shared_configs /app/shared_configs

# Model Server main code
COPY backend/model_server /app/model_server

ENV PYTHONPATH /app

EXPOSE 9000

CMD ["/bin/sh", "-c", "if [ \"${DISABLE_MODEL_SERVER:-false}\" = \"True\" ]; then echo 'Skipping service...'; exit 0; else exec uvicorn model_server.main:app --host 0.0.0.0 --port 9000; fi"]
