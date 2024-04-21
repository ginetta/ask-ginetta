# Ask Ginetta - Backend Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for the API Services and Background Tasks in Danswer.

Since both the `api_server` and `background` services in the original `docker-compose` use the same image (`danswer/danswer-backend:latest`) and potentially share the same environment, combining them into a single Dockerfile makes sense.

## Installation

From this directory, run the following commands:

```
# Create app
fly apps create ask-ginetta-backend

fly ips allocate-v6 --private -a ask-ginetta-backend

# Make a list of the environment variables you need to set,
# store their values in 1Password for the team to have access to.
# For instance, you'll want to set auth type to use Google accounts.
fly secrets set AUTH_TYPE=google_oauth -a ask-ginetta-backend
fly secrets set GOOGLE_OAUTH_CLIENT_ID=<value> -a ask-ginetta-backend
fly secrets set GOOGLE_OAUTH_CLIENT_SECRET=<value> -a ask-ginetta-backend
fly secrets set POSTGRES_USER=<pg_user> -a ask-ginetta-backend
fly secrets set POSTGRES_PASSWORD=<pg_password> -a ask-ginetta-backend
fly secrets set POSTGRES_DB=<pg_dbname> -a ask-ginetta-backend

```

Now navigate to the root directory of the application. This is necessary to run the Dockerfile build with the appropriate context:

```
# Navigate to root directory
cd ../../../

# Deploy your backend app using fly deploy and the Dockerfile
fly deploy --vm-size=shared-cpu-8x --config deployment/fly.io/backend/fly.toml --dockerfile Dockerfile -a ask-ginetta-backend
```
