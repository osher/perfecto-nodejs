
# Running and Removing containers

## The `docker run` cli command:
```
docker run -d -p 80:80 --name getting-started docker/getting-started
```

What is this? all commands follow this form:
```
docker <command> [<docker-switches>] [arguments]
```

docker run is a more private case:
```
docker run [<docker-switches>] <image-uri> [<command> [<...args>]]
```
In the case of the command above - we take the defaults for `command` and provide no `args`.

## exited cotnainers are not cleaned by default

```
$ docker run -d -p 80:80 --name getting-blocked docker/getting-started
95af84e67e7ac9ce305afed
$ docker run -d -p 80:80 --name getting-blocked docker/getting-started
docker: Error response from daemon: Conflict. The container name "/calc" is already in use ...
```

Docker does not know if you wish to inspect logs, take a snapshot or look inside.
You have to remove them explicitly:
```
docker stop getting-blocked
docker rm getting-blocked
```
or
```
docker rm -f getting-blocked
```

which is a private case of
```
docker rm <identifier>
```
where `<identifier>` can be the container-name or container-id, as appears in `docker ps -a`

## automatic discard

Alternatively, you can instruct docker to discard the container upon exit:
use the `--rm` for that

```
$ docker run --rm -d --restart -p 80:80 --name getting-started docker/getting-started
ce3095af8ed4e67e7ac95af
$ docker ps -a
...<will list the container>
$ docker stop getting started 
ce3095af8ed4e67e7ac95af
# docker ps -a
...<will NOT list the container>
```

## pruning the system

This will delete everything that is not used, not only containers:
```
docker system prune 
```

It asks for a `[y/n]` confirmation, unless provided a `-f/--force` switch.