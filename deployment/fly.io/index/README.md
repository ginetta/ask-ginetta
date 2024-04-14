# Ask Ginetta - Vespa (Index) Deployment

The Dockerfile and fly.toml provided in this repository can create a Fly.io application for the Vespa DB in Danswer.

## Installation

From this directory, run the following commands:

```
# Create app
fly apps create ask-ginetta-index

# Deploy your app using fly deploy and Vespa official image.
# Boost memory to prevent the app from crashing.
fly deploy --config fly.toml -a  ask-ginetta-index --vm-size=performance-4x --image vespaengine/vespa
```
