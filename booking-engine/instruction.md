# How to run gitbook locally:

## Install Rancher Desktop
https://rancherdesktop.io/

```bash
# Build docker image with current directory as context
docker build -t mews-gitbook .
# Run docker image with port 4000 exposed
docker run -p 4000:4000 mews-gitbook
```

Access the gitbook at http://localhost:4000
