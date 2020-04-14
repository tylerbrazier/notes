# Docker notes

Commands and arguments can often be completed with `Tab`

## Images
- an image is built from a Dockerfile
- to build an image in the directory of the Dockerfile: `docker build -t <repo[:tag]> .`
- list images: `docker image ls`. include `-a` to show intermediate images
- remove an image: `docker image rm <repo:tag>`

## Containers
- a container is a running instance of an image
- see running containers: `docker container ls`. include `-a` to see stopped ones too
- interactive shell in a new container: `docker run -it <image> /bin/sh`
- interactive shell in a running container: `docker exec -it <container> /bin/sh`
- stop running container: `docker container stop <name>`
- garbage collect stopped containers: `docker container prune` (docker doesn't automatically remove containers when they stop)
