# Ask Ginetta - Vespa (Index) Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for the Vespa DB in Danswer.

## Installation

From this directory, run the following commands:

```
# Create app
fly apps create ask-ginetta-index

# Deploy your app using fly deploy
# and postgres official Vespa image
fly deploy --image vespaengine/vespa
```
