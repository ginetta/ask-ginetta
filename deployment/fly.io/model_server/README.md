# Ask Ginetta - Model Server Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for the Danswer model server.

To properly run this deployment, your must first create the app (if not already existing), then navigate to the root of the application to run the deployment command.

This is necessary for the docker build context to correctly access the various files (requirements, model server code) without altering the directory structure in Danswer.

## Installation

From this directory, run the following commands:

```
# Create app
fly apps create ask-ginetta-model-server

# Set the secrets if any, e.g.
# fly secrets set DOCUMENT_ENCODER_MODEL=your_model --app ask-ginetta-model_server

# Now navigate to the root directory
cd ../../../

# Deploy your app using fly deploy, targeting the toml file.
fly deploy --config ./deployment/fly.io/model_server/fly.toml -a ask-ginetta-model-server
```
