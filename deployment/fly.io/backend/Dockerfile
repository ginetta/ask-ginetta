# Use Python 3.11 as the base image, updated for modern features and performance improvements
FROM python:3.11.7-slim-bookworm

# Default DANSWER_VERSION, typically overridden during builds by CI/CD tools like GitHub Actions
ARG DANSWER_VERSION=0.3-dev
ENV DANSWER_VERSION=${DANSWER_VERSION}

# Display the DANSWER_VERSION at build time
RUN echo "DANSWER_VERSION: ${DANSWER_VERSION}"

# Install system dependencies
# cmake needed for psycopg (postgres)
# libpq-dev needed for psycopg (postgres)
# curl included just for users' convenience
# zip for Vespa step futher down
# ca-certificates for HTTPS
RUN apt-get update && \
  apt-get install -y cmake curl zip ca-certificates libgnutls30=3.7.9-2+deb12u2 \
  libblkid1=2.38.1-5+deb12u1 libmount1=2.38.1-5+deb12u1 libsmartcols1=2.38.1-5+deb12u1 \
  libuuid1=2.38.1-5+deb12u1 && \
  rm -rf /var/lib/apt/lists/* && \
  apt-get clean

# Install the CPU versions of torch and torchvision directly
# to save on space. This is a workaround for the large size of the
# build image when using the regular torch and torchvision packages
# and their GPU dependencies.
RUN python -m pip install torch==2.0.1+cpu torchvision==0.15.2+cpu --index-url https://download.pytorch.org/whl/cpu

# Copy the requirements file
COPY ./backend/requirements/default.txt /tmp/requirements.txt

# /!\ Key difference with the snippet from ask-ginetta/backend/Dockerfile here.
# Remove original (GPU) torch and torchvision from the requirements file
RUN sed -i '/torch==2.0.1/d' /tmp/requirements.txt && \
  sed -i '/torchvision==0.15.2/d' /tmp/requirements.txt

# Install the remaining Python dependencies from the modified requirements file
RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt && \
  pip uninstall -y py && \
  playwright install chromium && playwright install-deps chromium && \
  ln -s /usr/local/bin/supervisord /usr/bin/supervisord

# Cleanup for CVEs and size reduction
# https://github.com/tornadoweb/tornado/issues/3107
# xserver-common and xvfb included by playwright installation but not needed after
# perl-base is part of the base Python Debian image but not needed for Danswer functionality
# perl-base could only be removed with --allow-remove-essential
RUN apt-get remove -y --allow-remove-essential perl-base xserver-common xvfb cmake \
  libldap-2.5-0 libldap-2.5-0 && \
  apt-get autoremove -y && \
  rm -rf /var/lib/apt/lists/* && \
  rm /usr/local/lib/python3.11/site-packages/tornado/test/test.key

# Expose port 8080 for the application
EXPOSE 8080

# Set up application files and environment paths
COPY ./backend/danswer /app/danswer
COPY ./backend/shared_configs /app/shared_configs
COPY ./backend/alembic /app/alembic
COPY ./backend/alembic.ini /app/alembic.ini
COPY ./backend/supervisord.conf /usr/etc/supervisord.conf
RUN ls -la /app

ENV PYTHONPATH /app

# Environment variables for application configuration
ENV AUTH_TYPE=${AUTH_TYPE:-disabled}
ENV SESSION_EXPIRE_TIME_SECONDS=${SESSION_EXPIRE_TIME_SECONDS:-86400}
ENV VALID_EMAIL_DOMAINS=${VALID_EMAIL_DOMAINS:-}
ENV GOOGLE_OAUTH_CLIENT_ID=${GOOGLE_OAUTH_CLIENT_ID:-}
ENV GOOGLE_OAUTH_CLIENT_SECRET=${GOOGLE_OAUTH_CLIENT_SECRET:-}
ENV REQUIRE_EMAIL_VERIFICATION=${REQUIRE_EMAIL_VERIFICATION:-}
ENV SMTP_SERVER=${SMTP_SERVER:-smtp.gmail.com}
ENV SMTP_PORT=${SMTP_PORT:-587}
ENV SMTP_USER=${SMTP_USER:-}
ENV SMTP_PASS=${SMTP_PASS:-}
ENV EMAIL_FROM=${EMAIL_FROM:-}

# Generative AI and Query Option Settings
ENV GEN_AI_MODEL_PROVIDER=${GEN_AI_MODEL_PROVIDER:-}
ENV GEN_AI_MODEL_VERSION=${GEN_AI_MODEL_VERSION:-}
ENV FAST_GEN_AI_MODEL_VERSION=${FAST_GEN_AI_MODEL_VERSION:-}
ENV GEN_AI_API_KEY=${GEN_AI_API_KEY:-}
ENV GEN_AI_API_ENDPOINT=${GEN_AI_API_ENDPOINT:-}
ENV GEN_AI_API_VERSION=${GEN_AI_API_VERSION:-}
ENV GEN_AI_LLM_PROVIDER_TYPE=${GEN_AI_LLM_PROVIDER_TYPE:-}
ENV GEN_AI_MAX_TOKENS=${GEN_AI_MAX_TOKENS:-}
ENV QA_TIMEOUT=${QA_TIMEOUT:-}
ENV MAX_CHUNKS_FED_TO_CHAT=${MAX_CHUNKS_FED_TO_CHAT:-}
ENV DISABLE_LLM_FILTER_EXTRACTION=${DISABLE_LLM_FILTER_EXTRACTION:-}
ENV DISABLE_LLM_CHUNK_FILTER=${DISABLE_LLM_CHUNK_FILTER:-}
ENV DISABLE_LLM_CHOOSE_SEARCH=${DISABLE_LLM_CHOOSE_SEARCH:-}
ENV DISABLE_LLM_QUERY_REPHRASE=${DISABLE_LLM_QUERY_REPHRASE:-}
ENV DISABLE_GENERATIVE_AI=${DISABLE_GENERATIVE_AI:-}
ENV DOC_TIME_DECAY=${DOC_TIME_DECAY:-}
ENV HYBRID_ALPHA=${HYBRID_ALPHA:-}
ENV EDIT_KEYWORD_QUERY=${EDIT_KEYWORD_QUERY:-}
ENV MULTILINGUAL_QUERY_EXPANSION=${MULTILINGUAL_QUERY_EXPANSION:-}
ENV QA_PROMPT_OVERRIDE=${QA_PROMPT_OVERRIDE:-}

# Database and Vespa Index Settings
ARG POSTGRES_HOST
ARG VESPA_HOST
ENV POSTGRES_HOST=${POSTGRES_HOST:-ask-ginetta-relational-db.internal}
ENV VESPA_HOST=${VESPA_HOST:-ask-ginetta-index.internal}
ENV POSTGRES_USER=${POSTGRES_USER:-}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-}

# Inference and Indexing Server Settings
ARG MODEL_SERVER_HOST
ARG INDEXING_MODEL_SERVER_HOST
ENV MODEL_SERVER_HOST=${MODEL_SERVER_HOST:-ask-ginetta-inference-model-server.internal}
ENV INDEXING_MODEL_SERVER_HOST=${MODEL_SERVER_HOST:-ask-ginetta-index-model-server.internal}

# Other Settings and Model Configurations
ENV WEB_DOMAIN=${WEB_DOMAIN:-}
ENV DOCUMENT_ENCODER_MODEL=${DOCUMENT_ENCODER_MODEL:-}
ENV DOC_EMBEDDING_DIM=${DOC_EMBEDDING_DIM:-}
ENV NORMALIZE_EMBEDDINGS=${NORMALIZE_EMBEDDINGS:-}
ENV ASYM_QUERY_PREFIX=${ASYM_QUERY_PREFIX:-}
ENV ENABLE_RERANKING_REAL_TIME_FLOW=${ENABLE_RERANKING_REAL_TIME_FLOW:-}
ENV ENABLE_RERANKING_ASYNC_FLOW=${ENABLE_RERANKING_ASYNC_FLOW:-}

# Logging and Telemetry
ENV DISABLE_TELEMETRY=${DISABLE_TELEMETRY:-}
ENV LOG_LEVEL=${LOG_LEVEL:-info}
ENV LOG_ALL_MODEL_INTERACTIONS=${LOG_ALL_MODEL_INTERACTIONS:-}
ENV LOG_VESPA_TIMING_INFORMATION=${LOG_VESPA_TIMING_INFORMATION:-}

# Run the Alembic migrations and start the application
WORKDIR /app

CMD /bin/sh -c "alembic -c alembic.ini upgrade head && \
  echo 'Starting Danswer Api Server' && \
  uvicorn danswer.main:app --host 0.0.0.0 --port 8080"
