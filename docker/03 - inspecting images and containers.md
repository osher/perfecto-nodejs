# Looking inside

Given a `getting-started` container:

```
docker run --rm -d -p 80:80 --name getting-started docker/getting-started
```

## inspecting the logs of a container

```
docker logs [options] <identifier>
```
e.g.
```
docker logs getting-started
```

You can tail the log with the `-f/--follow` switch:
```
docker logs -f getting-started
```

## inspecting the setup of a container

```
docker inspect <identifier>
```

e.g.

```
docker inspect getting-started
```

This will spit a JSON document. passing it through `jq` will print it in color.
```
docker inspect getting-started | jq
```

The most useful root keys are usually `NetworkSettings`, `Volumes` and `Config`.
```
docker inspect getting-started | jq '.[0].NetworkSettings
docker inspect getting-started | jq '.[0].Config
docker inspect getting-started | jq '.[0].Volumes
```
get the `jq` for your OS here: https://stedolan.github.io/jq/download/


## inspecting the OS of a running container
```
docker exec [options] <identifier> [shell]
```
options - `-it` - we want interactive connection with TTL session.
shell - most images will just have `sh` inside.

i.e:
```
docker exec -it getting-started sh
```
This will land you in the container.
Now you can `cd` where you want, `ls -la [<path> = .]`, `env|sort`, and even `apk add <package>` if you need more tools to troubleshoot.
Basically, this is not what you do to look for logs, but to look on the OS, the volumes, the env-vars, etc.

## inspecting the OS of a stopped container
Useful when the container won't start (and was not run with `--rm`)
```
docker export calc | tar -tvf -
```
This works regardless to if it runs or not.

(windows - you can use the `-o` switch, specify a filename for the archive, and open it with `7z`)

## inspecting the OS of an image

Useful for checking suspicious images - so if it's suspicious we do NOT want to run it.
First, create a container of it, without running it.
```
docker create --name getting-started docker/getting-started
```

Then, export it - like we did above.

## References
There's more here: https://www.cloudsavvyit.com/14663/how-to-inspect-a-docker-images-content-without-starting-a-container/

