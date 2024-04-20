# Ask Ginetta - Web Server Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for the web server in Danswer.

## Installation

From this directory, run the following commands.

1. Create the application

```
fly apps create ask-ginetta-web-server
```

2. Set the environment variable pointing to the backend API (should be http://<backend-app-name>.internal:8080)

```
fly secrets set INTERNAL_URL=http://ask-ginetta-backend.internal:8080
```

3. Now navigate to the root directory of the application to run the commands to provision the machine.

```
cd ../../../
```

> This is necessary to run the Dockerfile build with the appropriate context.

4. Deploy your web server app using fly deploy and the Dockerfile

```
fly deploy --vm-size=shared-cpu-8x --config deployment/fly.io/web_server/fly.toml --dockerfile Dockerfile -a ask-ginetta-web-server
```
