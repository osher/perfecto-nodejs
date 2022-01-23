# Running commands in a container

Using the CLI command:
```
docker exec [<options>] <container> <command>
```


## given a runnig contaienr

```
docker run --rm -d -p 80:80 --name getting-started docker/getting-started
```

## arbitrary command

```
docker exec getting-started env
```
The `env` command prints all the env-vars the container experiences.
It runs inside the default entrypoint `/bin/sh`.


## interactively

use `--interactive --ttl` and use the shell as an entrypoint:
```
docker exec -it getting-started sh
```

Then you can `cd` where you want, `ls -la <path>` what you want, and even `apk add <pacakge>` if you must.
Just remember that if the container restarts or redeploys - it's all basically "washed away". By design.
