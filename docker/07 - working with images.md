# Working with Images

Whenever you try to run an image - if it's not present in the daemon's local image store, the daemom will try to pull it.

If the registry owning the image requires login - it will have to be logged in.

## Authenticating

```
docker login [-u <user>] <registry>
```
This should end with the message
```
Login Succeeded
```

## Pulling images

```
docker pull <imageUri>
```

## listing what images the daemon has

```
docker images
```

## deleting single images
```
docker rmi <identifier>
```
`rmi` = remove image

where `<identifier>` may be an image-uri or an image Id (a sha-like code).

## pruning all unused images
```
docker images prune
```