IMAGE_NAME = pokeffective
DEV_IMAGE_NAME = $(IMAGE_NAME)-dev

COMPOSE_FILE = docker-compose.yml
COMPOSE_DEV_FILE = docker-compose.dev.yml

.PHONY: build build-dev test test-watch clean run run-dev stop

build:
	docker build -t $(IMAGE_NAME):latest .

build-dev:
	docker build -t $(DEV_IMAGE_NAME):latest -f Dockerfile.dev .

test: build-dev
	docker run --rm $(DEV_IMAGE_NAME):latest npm test

test-watch: build-dev
	docker run --rm -it $(DEV_IMAGE_NAME):latest npm run test:ui

run: build
	docker run -d -p 80:80 --name $(IMAGE_NAME) $(IMAGE_NAME):latest

run-dev: build-dev
	docker run -it --rm \
		-p 5173:5173 \
		-v $(PWD):/app \
		-v /app/node_modules \
		--name $(IMAGE_NAME)-dev \
		$(DEV_IMAGE_NAME):latest

stop:
	docker stop $(IMAGE_NAME) || true
	docker stop $(IMAGE_NAME)-dev || true

clean: stop
	docker rm $(IMAGE_NAME) || true
	docker rm $(IMAGE_NAME)-dev || true
	docker rmi $(IMAGE_NAME):latest || true
	docker rmi $(DEV_IMAGE_NAME):latest || true

help:
	@echo "Available targets:"
	@echo "  build       - Build production Docker image"
	@echo "  build-dev   - Build development Docker image"
	@echo "  test        - Run tests once in Docker"
	@echo "  test-watch  - Run tests in watch mode in Docker"
	@echo "  run         - Run production container"
	@echo "  run-dev     - Run development container"
	@echo "  stop        - Stop running containers"
	@echo "  clean       - Remove containers and images"