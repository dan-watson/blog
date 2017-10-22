BASE_IMAGE = node:8-alpine
BUILDER_IMAGE = dan-watson/blog
CMD = 'node app.js'
SH_CMD = ash 

DOCKER_RUN_ARGS = \
	--rm --tty --interactive \
	--volume $(PWD):/src

SERVE_CMD := docker run \
	--name dan-watson-blog \
	$(DOCKER_RUN_ARGS) \
	--publish 0.0.0.0:8080:8080 \
	$(BUILDER_IMAGE)

build:
	docker run $(DOCKER_RUN_ARGS) \
		--workdir /src \
		--volume /var/run/docker.sock:/var/run/docker.sock \
			boxbuilder/box:master Boxfile
serve:
	$(SERVE_CMD) \
		$(CMD)
sh:
	$(SERVE_CMD) \
		$(SH_CMD)
destroy:
	docker image rm $(BUILDER_IMAGE)
	docker image rm $(BASE_IMAGE)
