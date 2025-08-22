# Contributing Guidelines

This document describes the standards for making changes to this repository.

## Before You Start

- Make sure you have the required tools installed (see _Development Setup_ below).
- Follow the standard commit message format (see _Commit Standards_ below).

## Development Setup

Install `make` for standardized development workflows.

```bash
sudo apt update
sudo apt install build-essential
```

Install `volta` for managing dependencies.

```bash
cd ~
curl https://get.volta.sh | bash
source ~/.zshrc
volta --version
volta install node
node --version
npm --version
```

Run `make install` to install the required dependencies.

## Commit Standards

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

```markdown
<type>: <description>
```

Examples:

```markdown
docs: add development requirements
fix: correct install symlinks
refactor: simplify async handling
```

Checkout [commitlint config](commitlint.config.cjs) for allowed types.

## Before Committing Your Changes

Run `make prepare` in the root of the repository. This target runs all the required checks.
