# Rahti notes

1. build img: docker build -t upbeat .
2. log in to Rahti 2 - Login command + docker login -u unused -p $(oc whoami -t) image-registry.apps.2.rahti.csc.fi
3. Tag img: docker login -u unused -p $(oc whoami -t) image-registry.apps.2.rahti.csc.fi
4. Push: docker push image-registry.apps.2.rahti.csc.fi/upbeat-apps/app-name:latest

Frontend img:
cd web
docker tag upbeat image-registry.apps.2.rahti.csc.fi/upbeat-apps/upbeat:latest
docker push image-registry.apps.2.rahti.csc.fi/upbeat-apps/upbeat:latest

## Changing a Route Hostname in Rahti

To change a hostname of an existing application in Rahti, you need to delete the old route and create a new one with your desired hostname. Follow these steps:

## Step 1: Delete the existing route

```bash
oc delete route <route-name> -n <namespace>
```

Replace `<route-name>` with your route name and `<namespace>` with your project name.

## Step 2: Create a new route with your desired hostname

```bash
oc expose service <service-name> -n <namespace> --hostname=<custom-name>.2.rahtiapp.fi --port=<port> --tls-termination=edge --insecure-policy=Redirect
```

Replace:

- `<service-name>` with the name of your service
- `<namespace>` with your project name
- `<custom-name>` with your desired hostname prefix
- `<port>` with the port your service uses (e.g., "3000-tcp")

## Example

```bash
# Delete the old route
oc delete route upbeat -n upbeat-apps

# Create a new route with a custom hostname
oc expose service upbeat -n upbeat-apps --hostname=upbeat.2.rahtiapp.fi --port=3000-tcp --tls-termination=edge --insecure-policy=Redirect
```

**Note:** Hostnames in Rahti must end with `.2.rahtiapp.fi` and the prefix must be unique across the Rahti environment.
