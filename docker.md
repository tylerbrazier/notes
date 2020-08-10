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
- run a container: `docker run [options] <image>`
  + `-d` detach; run in the background
  + `--init` to forward signals (e.g. SIGTERM) to the contained process
  + `-p 80:8080` forwards port `80` traffic on the host to port `8080` in the container
  + `-e VARIABLE=value` to set env vars in the container; pass this option once for each variable, or:
  + `--env-file=<file>` send a list of env vars from `<file>` to the container
  + `--restart=unless-stopped` restart the container if it exits (unless stopped by `docker container stop`)
  + `--name=whatever` docker automatically names the container unless you give it a name
- interactive shell in a new container: `docker run -it <image> /bin/sh`
- interactive shell in a running container: `docker exec -it <name> /bin/sh`
- stop running container: `docker container stop <name>`
- garbage collect stopped containers: `docker container prune` (docker doesn't automatically remove containers when they stop)
- see a container's logs: `docker logs <name>`

## .dockerignore
This usually includes things like:

	README.md
	node_modules
	tests
	*.log
	.env
	.eslintrc.js
	.editorconfig
	.git
	.gitignore

<https://docs.docker.com/engine/reference/builder/#dockerignore-file>

## Troubleshooting
To fix network issues, I've had to use `--network host` on `build` and `run`.
When doing this for `run`, I had to use something like `-e PORT=80` to set the port in the container instead of doing `-p 80:80`;
in that case, the running app needs to know to listen on the port specified by the `PORT` env variable.
