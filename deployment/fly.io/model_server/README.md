# Ask Ginetta - Model Server Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for both the inference model server and index model server.

## Installation

We're going to install both the Inference and the Index Model Servers in one go. From a deployment standpoint, there's limited difference between the two. They share the same `Dockerfile`. The Index Model server has an extra environment variable (`INDEXING_ONLY`) that has a default `True` value.

1. From this directory, create the apps.

```
fly apps create ask-ginetta-index-model-server
fly apps create ask-ginetta-inference-model-server
```

2. Allocate a private IP address for both.

```
fly ips allocate-v6 --private -a ask-ginetta-index-model-server
fly ips allocate-v6 --private -a ask-ginetta-inference-model-server
```

3. Navigate to the root directory to run the deployment command.

> This is necessary so that the Dockerfile adapted from the docker compose file has the right context to build the image.

```
cd ../../../
```

4. Deploy your apps.

```
fly deploy --vm-size=shared-cpu-8x --config ./deployment/fly.io/model_server/fly.toml -a ask-ginetta-index-model-server
fly deploy --vm-size=shared-cpu-8x --config ./deployment/fly.io/model_server/fly.toml -a ask-ginetta-inference-model-server
```
