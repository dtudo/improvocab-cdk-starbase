module.exports = {
  '**/*.md': ['markdownlint-cli2 --fix', 'prettier --write'],
  '**/*.cjs': ['eslint --fix', 'prettier --write'],
  '**/*.json': ['prettier --write'],
};
