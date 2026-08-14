# Releasing

Package versions, changelogs, GitHub releases, npm publication, and the website are automated.

## One-time repository setup

1. Add a fine-grained GitHub personal access token as the `RELEASE_PLEASE_TOKEN` Actions secret. It needs access to create release pull requests and tags. Release Please falls back to `GITHUB_TOKEN`, but GitHub does not start pull-request workflows for changes created with that token.
2. After this workflow exists on GitHub, configure all packages to trust it by running the following command while logged into npm. Approve the first two-factor authentication request and select the five-minute skip option for the remaining packages. No npm token is stored in GitHub.

   ```sh
   for manifest in packages/*/package.json; do npm trust github "$(jq -r .name "$manifest")" --file release.yml --repo keneanung/nexus-scripts --allow-publish --yes; sleep 2; done
   ```

## Normal workflow

1. Merge conventional commits into `main`.
2. Review and merge the combined Release Please pull request. It contains only packages affected by releasable commits and any dependent packages that need a version update.
3. The release workflow verifies the source, generated Nexus packages, packed npm tarballs, executable entrypoints, builder/splitter roundtrip, and website. It then publishes only versions not already present on npm.
4. GitHub Pages deploys once after the `main` verification succeeds. Package tags no longer trigger competing deployments.

If npm publication needs to be retried after a transient failure, manually run the `Release` workflow. It repeats the complete verification and publishes any versions still missing from npm.

Run the same release gate locally with:

```sh
npm run verify
```
