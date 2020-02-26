# docker notes
- a 'container' is a running instance of an 'image'
- interactive shell in a new container: `docker run -it <image> /bin/sh`
- interactive shell in a running container: `docker exec -it <container> /bin/sh`
- see running containers: `docker container ls`. include `-a` to see stopped too
- garbage collect stopped containers: `docker container prune` (docker doesn't automatically remove containers when they stop)
