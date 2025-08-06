.PHONY: install lint format format-check prepare

install:
	@npm ci

lint:
	@npm run lint

format:
	@npm run format

format-check:
	@npm run format:check

prepare: lint format-check
