# Intervene in a container run and Customize it

So far, we did almost "vanila" runs of a background service.

```
docker run --rm -d -p 80:80 --name getting-started docker/getting-started
```

## run in foreground

just omit the `-d` flag (which is shortcut for `--detached`).

```
docker run --rm -p 80:80 --name getting-started docker/getting-started
```
The container is now coupled with your shell.
`Ctrl+C` will send it termination signal, and since it comes with `--rm` it will cleanup itself upon exit.


## control the published ports
`-p/--publish` - is where you control the ports.
This switch can appear as many times as necessary.

on the left - the port that will be bound on your host OS.
on the right - the port that will be bound from inside the container.

Same on the ps command.
```
$ docker run --rm -d -p 80:80 --name getting-started80 docker/getting-started
$ docker run --rm -d -p 81:80 --name getting-started81 docker/getting-started
$ docker run --rm -d -p 82:80 --name getting-started82 docker/getting-started
$ docker ps --format '{{.ID}} - {{.Ports}}'
63eb15c3e4e7 - getting-started82 - 0.0.0.0:82->80/tcp
b192cc374097 - getting-started81 - 0.0.0.0:81->80/tcp
fcba6679a2f9 - getting-started80 - 0.0.0.0:80->80/tcp
$
```
here  you see 3 containers of the same base image, bound to 3 ports on the host machine

(yes, it does mean a container can have multiple names, but not the opposite: a name will always point to a single container).


## running a different main process

The command for the main process is built of two parts:
 - entrypoint - by default, for limux it's `/bin/sh` (unless overriden by the image)
 - command - the default command passed to the entrypoint, empty by default.

### interactively

```
docker run -it --rm docker/getting-started sh
```
Here we ask the container to run `sh` instead of it's default command.
This will land you inside the container.
You can `cd` where you like, `ls -la <path>`, and poke around.

(i) Note that since we `--rm` and run a shell transiently - we don't really need a `--name`.

### run just some ad-hoc command

```
docker run --rm --entrypoint='/bin/sh' docker/getting-started -c 'env|sort'
```
this will run the `/bin/sh` as the entrypoint that will accept args and provide it `-c` switch and the  injected command to evaluate, which is `env|sort`.


(i) note that without the `--entrypoint` switch - you get an error:
```
/docker-entrypoint.sh: exec: line 38: env|sort: not found
```
Which reveals that the entrypoint of that image is a bash script with some private logic around the `nginx` process.


## provide env-vars

### from command line

using the `-e/--env` switch:

```
docker run --rm --entrypoint='' --env=PERFECTO=yup docker/getting-started /bin/sh -c 'env|grep PERF'
```
(i) Note that since we `--rm` and run a shell transiently - we don't really need a `--name`.

### from a file

```
echo PERFECTO=from-file > perfecto.env
docker run --rm --entrypoint='' --env-file=perfecto.env docker/getting-started /bin/sh -c 'env|grep PERF'
```
(i) Note that since we `--rm` and run a shell transiently - we don't really need a `--name`.

## mount volumes

Volumes by default are "private property" of the docker daemon.
But sometimes you want volumes that are shared with your OS.

MIND THAT VOLUMES ARE BETWEEN THE DAEMON AND IT'S OS - not yours!

To get volumes from your `mac`/`windows` host you need to work harder.
Luckily, the Docker-Desktop does most of the heavy lifting and mounts your drives on the OS the docker daemon experiences.

Here's how the command works on my windows:

```
docker run --rm -it -v /c/ws/tikal/sandbox:/sandbox --entrypoint="" docker/getting-started /bin/sh -c "ls -la /sandbox"
```




















