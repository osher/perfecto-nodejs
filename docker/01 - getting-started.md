# First glance - getting-started

## assure a clean system
stop and remove all containers:
```
[ "$(docker ps --all --quiet)" = "" ] || docker rm -f $(docker ps --all --quiet)
```
This expression checks if there's any container - and if yes, removes everything it finds.

## run the getting started

run a container, named getting-started, bound to port 80
```
docker run -d -p 80:80 --name getting-started docker/getting-started 
```

Check what is running - expect the getting-started
```
docker ps
```

Check the logs of the getting-started container:
```
docker logs getting-started
```

## stoped containers are still there

Stop the container:
```
docker stop getting-started
```

Check what is running - expect nothing!
```
docker ps
```

Check what containers are found - regardless to running or not
```
docker ps --all
```
expect the cotnainer to be listed.

Remove the getting started
```
docker rm getting-started
```

Check what is running and what is present - expect nothing
```
docker ps
docker ps -a
```