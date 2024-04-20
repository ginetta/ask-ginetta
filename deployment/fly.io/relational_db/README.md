# Ask Ginetta - PostgresQL (Relational DB) Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for the PostgresQL DB in Danswer.

## Pre-requisites

Install the `flyctl` command-line interface.

```
brew install flyctl
```

## Installation

1. From this directory, create the application on fly.io.

```
fly apps create ask-ginetta-relational-db
```

2. Set the necessary PostgreSQL credentials. They should be stored in 1Password

> If you update any secret or credentials, make sure you store them in 1Password for the rest of the team.

```
fly secrets set POSTGRES_USER=<user>
fly secrets set POSTGRES_PASSWORD=<password>
fly secrets set POSTGRES_DB=<dbname>
```

3. Deploy your application.

```
fly deploy --vm-size=shared-cpu-8x --image postgres:13
```

> We are using a `shared-cpu-8x` VM to give PostgreSQL enough memory. This is subject to modifications based on usage monitoring.

4. When prompted whether to allocate ipv4 and ipv6 address, type `N` for `NO`.

The installation logs should end with a success message.

```
✔ Machine 2874262c601568 [app] update finished: success
```

## Troubleshooting Failing Installation

If your installation reports a failure, login to the Ginetta Fly.io dashboard and read the logs for your app's machine.

Common installation failure include the following.

### The application fails on startup due to too few resources.

Run `fly status -a <name-of-app>` or look for the app's machine(s) state in the dashboard. If it is not running automatically upon install, it could be caused to the app crashing because of a lack of resources.

TODO: how to scale

### Deploying an image on top of an already existing and running application

TODO: explain (DB as an example)
