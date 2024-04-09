# Ask Ginetta - Web Server Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for the web server in Danswer.

## Installation

From this directory, run the following commands:

```
# Assuming the project's name is "Ask Ginetta"
fly apps create ask-ginetta-web-server

# Set the environment variable pointing to the backend API
# (should be http://<backend-app-name>.internal:8080)
fly secrets set INTERNAL_URL=http://ask-ginetta-api-server-background.internal:8080

# Deploy your frontend app using fly deploy and the Dockerfile
fly deploy --config fly.toml --dockerfile Dockerfile
```
