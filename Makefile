.PHONY: install clean build test lint format format-check clean-build prepare

install:
	@npm ci

clean:
	@npm run clean

build:
	@npm run build

test:
	@npm run test

lint:
	@npm run lint

format:
	@npm run format

format-check:
	@npm run format:check

clean-build: clean build

prepare: clean-build test lint format-check
