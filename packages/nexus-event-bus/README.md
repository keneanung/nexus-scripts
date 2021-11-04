# Iron Realms Nexus Script Template #

The world of JavaScript is full of useful tools for writing complex programs and scripts.
As a professional developer, I wanted to take advantage of these tools for more complex
packages for Nexus, which makes only rudimentary tools available. But setting the tools
up and combining them takes a lot of boilerplate, which is not easily configured.

This template repository aims to deliver a pre-configured and opinionated environment for the aspiring Nexus developer. It configures the following features:

- TypeScript as the programming language of choice
- Automated export of the code as an NPM package, useful for writing libraries or
  publishing typings
- Webpack for exporting the code for use on Nexus
- webpack-server for local development (including a Nexus helper package)
- Jest as Unit Test platform
- Linting through ESLint to enforce coding best practices
- Prettier as formatter
- Automatically deployed Docusaurus website for documentation and hosting the code
  bundle for nexus
- Automatic Linting and Unit Testing on new commits and pull requests
- CodeQL and Dependabot security scans and updates

## Using the functionality ##

### Automatically triggered functionality ###

#### Checks on every commit to `development` and pull requests ####

Whenever a new commit is added to the `development` branch on GitHub or a pull request
is opened or modified, a GithubActions workflow is triggered. This workflow has three
jobs, which run the unit tests, run the linter and compile the code (both with webpack
and for packages) on three NodeJS versions. If any of these jobs fails, GitHub will mark
the commit as `failed` and give feedback that way. This helps you to be notified of any
errors as soon as possible.

A second workflow that is triggered is the scan for potential security issues using
CodeQL.

#### Daily runs ####

Dependabot will check your NPM dependencies daily for new versions. If a new version is
found, it will create a pull request, which in turn will trigger the appropriate checks.
That way you can stay up to date with your dependencies and still have a low risk of
breaking something. The pull request will have a number of commands you can use, in case
the version is troublesome.

#### Checks on new tags ####

Whenever a new tag of the format `vX.X.X` (semantic versioning) is created, a Github
Actions workflow will start, which takes care of things that need to be done on release.
In particular, the workflow will publish the package to both the NPM and GitHub registry
for NPM packages and publish the new documentation to the `gh-pages` branch, which can be
used to create a project page on GitHub pages.

### Manually triggered functionality ###

#### Local development server ####

Developing Nexus scripts with external tools is relatively cumbersome: getting your
script to load into Nexus is not easy. However, this template aims to help by providing
a command to host the script locallaly and a Nexus reflex package with a single alias.

The command to get the development server starting is `npm run serve` or `yarn serve`
from the root directory of the project. This will start the webpack development server
on port `8080` with your script. This has even hot reloading functionality (meaning you
don't need to refresh the page when doing changes), but that feature is currently
untested.

The second part to get the script into Nexus is the reflex package `helper-package.nxs`.
Once it is installed (which you need to do only once, even if you create multiple
packages), you can use the command `load local script` to connect to the running
development server and load the script in. This has to be done on every reload of Nexus.

#### Keeping the code clean ####

The command `npm run lint` (or `yarn lint`) runs the configured ESLint locally, so you
don't have to commit and push your code to get warnings about best practice violations.
It is recommended to run the command regularly.

The same is true for `npm run format` (or `yarn format`), which will run your code
through a code formatter to keep it in a consistent style. This is important if multiple
contributers are part of the development at some point as it will help you find things.

#### Unit tests ####

The command `npm run test` (or `yarn test`) will run your Unit Tests locally. Remember
to write tests, so you know your code works. This will spare you a lot of reloading of
Nexus and re-logging, which in turn will speed your development cycle up dramatically.

Tests should test the functionality in the local folder and be contained in a subfolder
named `__tests__` to be picked up automatically. For the format of unit tests in Jest,
see the unit test in the template and the Jest website. A good starting point with many
examples is the page [about matchers](https://jestjs.io/docs/using-matchers).

#### Releasing a new version ####

While it's definitely possible to manually increase the package version number and then
set the git tag, it is recommended to use `npm version <major|minor|patch>` to do that.
This will trigger testing, linting and formatting, to make sure everything works ok,
before the new tag is created and automatically pushed via `git`.

#### Creating documentation ####

The template is set up to use [Docusaurus](https://docusaurus.io/) to build the
documentary webpage, which will also host the JavaScript file, which your users will
load into Nexus. This is a quite feature heavy approach, but it fits very well into the
JavaScript ecosystem. The template lives in the `website` subfolder.

I suggest you use the `docs` subfolder to write the documentation for your script.
Release notes and other information can go into the `blog` folder.

**IMPORTANT**: Do not modify the file `src/pages/index.md` as it will be overwritten by
the main README file (this file) when publishing the website on a tag.

To show, how your website will look like, you can use `npm run website` (or `yarn
website`) in the root directory of the project to run a local webserver and open the
browser to show how the site currently looks like.

## Installing ##

TODO
