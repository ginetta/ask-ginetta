# Ask Ginetta - PostgresQL (Relational DB) Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for the PostgresQL DB in Danswer.

## Installation

From this directory, run the following commands:

```
# Set the secrets for the DB user, password and name.
# Make sure you store them in 1Password to make it
# available to the rest of the team.
fly secrets set POSTGRES_USER=<user>
fly secrets set POSTGRES_PASSWORD=<password>
fly secrets set POSTGRES_DB=<dbname>

# Deploy your app using fly deploy
# and postgres official Docker image
fly deploy --image postgres:13
```
