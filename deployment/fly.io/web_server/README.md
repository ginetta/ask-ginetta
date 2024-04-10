# Ask Ginetta - Web Server Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for the web server in Danswer.

## Installation

From this directory, run the following commands:

```
# Assuming the project's name is "Ask Ginetta"
fly apps create ask-ginetta-web-server

# Set the environment variable pointing to the backend API
# (should be http://<backend-app-name>.internal:8080)
fly secrets set INTERNAL_URL=http://ask-ginetta-backend.internal:8080
```

Now navigate to the root directory of the application. This is necessary to run the Dockerfile build with the appropriate context:

```
# Navigate to root directory
cd ../../../

# Deploy your web server app using fly deploy and the Dockerfile
fly deploy --config deployment/fly.io/web_server/fly.toml --dockerfile Dockerfile -a ask-ginetta-web-server
```
