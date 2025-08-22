const { RuleConfigSeverity } = require('@commitlint/types');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'docs', // documentation changes
        'refactor', // code change that neither fixes a bug nor adds a feature
        'test', // adding or fixing tests
        'build', // changes that affect the build system or dependencies
        'ci', // changes to CI configuration
        'chore', // routine tasks, maintenance
        'revert', // reverts a previous commit
        'release', // lib version bump
      ],
    ],
    'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'type-empty': [RuleConfigSeverity.Error, 'never'],

    'scope-case': [RuleConfigSeverity.Error, 'always', 'kebab-case'],

    'subject-case': [
      RuleConfigSeverity.Error,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-full-stop': [RuleConfigSeverity.Error, 'never', '.'],

    'header-trim': [RuleConfigSeverity.Error, 'always'],
    'header-max-length': [RuleConfigSeverity.Error, 'always', 72],
  },
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
};
