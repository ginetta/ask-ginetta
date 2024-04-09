# Use Python 3.11 as the base image, updated for modern features and performance improvements
FROM python:3.11.7-slim-bookworm

# Default DANSWER_VERSION, typically overridden during builds by CI/CD tools like GitHub Actions
ARG DANSWER_VERSION=0.3-dev
ENV DANSWER_VERSION=${DANSWER_VERSION}

# Display the DANSWER_VERSION at build time
RUN echo "DANSWER_VERSION: ${DANSWER_VERSION}"

# Install system dependencies
RUN apt-get update && \
  apt-get install -y cmake curl zip ca-certificates libgnutls30=3.7.9-2+deb12u2 \
  libblkid1=2.38.1-5+deb12u1 libmount1=2.38.1-5+deb12u1 libsmartcols1=2.38.1-5+deb12u1 \
  libuuid1=2.38.1-5+deb12u1 && \
  rm -rf /var/lib/apt/lists/* && \
  apt-get clean

# Set the working directory in the container
WORKDIR /usr/src/app

# Install Python dependencies from a requirements file
COPY ./backend/requirements/default.txt /tmp/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt && \
  pip uninstall -y py && \
  playwright install chromium && playwright install-deps chromium && \
  ln -s /usr/local/bin/supervisord /usr/bin/supervisord

# Cleanup to reduce image size and remove unused packages
RUN apt-get remove -y --allow-remove-essential perl-base xserver-common xvfb cmake \
  libldap-2.5-0 libldap-2.5-0 && \
  apt-get autoremove -y && \
  rm -rf /var/lib/apt/lists/* && \
  rm /usr/local/lib/python3.11/site-packages/tornado/test/test.key

# Expose port 8080 for the application
EXPOSE 8080

# Set up application files and environment paths
COPY ./backend/danswer /app/danswer
COPY ./backend/shared_models /app/shared_models
COPY ./backend/alembic /app/alembic
COPY ./backend/alembic.ini /app/alembic.ini
COPY ./backend/supervisord.conf /usr/etc/supervisord.conf

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
ENV POSTGRES_HOST=relational_db
ENV VESPA_HOST=index

# Other Settings and Model Configurations
ENV WEB_DOMAIN=${WEB_DOMAIN:-}
ENV DOCUMENT_ENCODER_MODEL=${DOCUMENT_ENCODER_MODEL:-}
ENV DOC_EMBEDDING_DIM=${DOC_EMBEDDING_DIM:-}
ENV NORMALIZE_EMBEDDINGS=${NORMALIZE_EMBEDDINGS:-}
ENV ASYM_QUERY_PREFIX=${ASYM_QUERY_PREFIX:-}
ENV ENABLE_RERANKING_REAL_TIME_FLOW=${ENABLE_RERANKING_REAL_TIME_FLOW:-}
ENV ENABLE_RERANKING_ASYNC_FLOW=${ENABLE_RERANKING_ASYNC_FLOW:-}
ENV MODEL_SERVER_HOST=${MODEL_SERVER_HOST:-}
ENV MODEL_SERVER_PORT=${MODEL_SERVER_PORT:-}

# Logging and Telemetry
ENV DISABLE_TELEMETRY=${DISABLE_TELEMETRY:-}
ENV LOG_LEVEL=${LOG_LEVEL:-info}
ENV LOG_ALL_MODEL_INTERACTIONS=${LOG_ALL_MODEL_INTERACTIONS:-}
ENV LOG_VESPA_TIMING_INFORMATION=${LOG_VESPA_TIMING_INFORMATION:-}

# Default command to run the application
# Adjusted to a more generic CMD to accommodate both api_server and background services
CMD ["tail", "-f", "/dev/null"]
