# Fly.io Deployment

Fly.io is a cloud platform that allows developers to deploy applications close to their users by converting containers into micro-VMs. It's designed to simplify the process of deploying and managing applications, making it possible to run full stack apps (including databases) from a Dockerfile and/or a toml configuration file.

Since Fly.io is designed to run from Dockerfiles, we need to split the services in the compose files into its own set of Dockerfiles.

## Deployment Strategy

Two services (`api_server` and `background`) use the same image handling web requests and background processing. They depend on the `relational_db` and `index` services. We deploy these as a single application on Fly.io, considering they share the same environment and dependencies, on Python-based Dockerfile.

The `relational_db` and `index` services are deployed as apps of the same name, respectively from an official `postgres` and `vespa` docker image.

The `web_server` app as well, with a Node-based Dockerfile.

Given the usage information on local usage, ensure that your VMs have sufficient storage for the following volumes:

- `db_volume` (250mb, for `relational_db` app)
- `local_dynamic_storage` (1Mb, for the `api_server`/`background` app)
- `file_connector_tmp_storage` (1Mb, for the `api_server`/`background` app)
- `model_cache_nltk` (65MB, for the `api_server`/`background` app)
- `model_cache_torch` (1.59GB, for the `model_server` app)
- `model_cache_huggingface` (275MB, for the `model_server` app)
- `vespa_volume` (about 1.50Gb for +50K docs, for the `index` app)

All values have been rounded up, but the last one is arguably the most important has it is potentially growing with new docs added by your connectors.
