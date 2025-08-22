# improvocab-cdk-starbase

CDK library of shared infrastructure constructs.

In the Star Wars universe, a starbase is a central command and support hub—equipped to serve fleets, manage logistics, and maintain operational readiness. Similarly, improvocab-cdk-starbase acts as the foundation for shared infrastructure patterns, providing reusable CDK constructs that enable consistent, scalable deployments across multiple services. This repository ensures stability and alignment in the cloud architecture, functioning as the strategic core behind every launch.

Project that exposes a changesets and GitHub Actions set up for a library CICD. See [scripts/setup-repository.sh](scripts/setup-repository.sh) for setting up the repository.

## Library release process

### Initial setup

1. npm install --save-dev @changesets/cli
2. npm install --save-dev @changesets/changelog-github
3. npx @changesets/cli init
4. Use <https://github.com/apps/changeset-bot>. Modify selected repos from here: <https://github.com/settings/installations/82215712>
5. Add write permission for cdk-starbase to publish the package. Can be done from here <https://github.com/users/dtudo/packages/npm/improvocab-cdk-starbase/settings>. You might need to publish v0.0.0 from local first.

### Day to day workflow

- Do your changes need a version bump?
- Yes
  - npx @changesets/cli
  - Select patch/minor/major and write the changelog. This writes an md file to .changeset
  - commit
  - PR
  - Merge
  - GH Actions will open a version bump PR
    - Basically it runs npx @changesets/cli version and checks if there’s anything inside .changeset, if yes it deletes it and opens a PR with version bump
  - Merge
  - GH Actions will publish the library (publish.yml)
    - Basically it runs npx @changesets/cli publish
  - GH Actions will create a release (create-release.yml)

- No
  - commit
  - PR
  - You will get a comment from changeset-bot, ignore it

### Useful links

- [semantic-release or changesets (Reddit thread)](https://www.reddit.com/r/javascript/comments/10chf6k/askjs_publishing_npm_packages_semanticrelease_or/)
- [How to publish your package with GitHub Packages (Medium)](https://thiraphat-ps-dev.medium.com/how-to-publish-your-package-with-github-packages-384df1237a96)
- [Simplest way to publish and automate npm packages (Dev.to)](https://dev.to/wdsebastian/simplest-way-to-publish-and-automate-npm-packages-d0c)

### Examples

#### CHANGELOG.md examples

- [ember-headless-table](https://github.com/CrowdStrike/ember-headless-table/blob/main/ember-headless-table/CHANGELOG.md)
- [fcl-js util-actor](https://github.com/onflow/fcl-js/blob/master/packages/util-actor/CHANGELOG.md)
- [queuedash UI](https://github.com/alexbudure/queuedash/blob/main/packages/ui/CHANGELOG.md)

#### Tags/Releases examples

- [AWS CDK tags](https://github.com/aws/aws-cdk/tags)
- [changesets/action release v1.5.2](https://github.com/changesets/action/releases/tag/v1.5.2)
- [changesets tags](https://github.com/changesets/changesets/tags)
- [markdownlint-cli2 tags](https://github.com/DavidAnson/markdownlint-cli2/tags)
- [shellcheck tags](https://github.com/koalaman/shellcheck/tags)

### FAQ

1. `How do these people get more than 1 commit in a single semver bump?` They ignored the version bump PR and each time the .changeset/ markdown files were committed in multiple commits, they gathered up in the CHANGELOG.md
   commit
   PR
   You will get a comment from changeset-bot, ignore it
