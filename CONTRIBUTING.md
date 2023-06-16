# 🐞 I think I found a bug or have a feature request

Great! To help fixing the bug, please consider sumbitting a [bug report](https://github.com/keneanung/nexus-scripts/issues/new]) after checking, if it is not yet reported. If you supply as much information as possible (eg package name, version of the package, reproduction information, logs), chances are that the bug is fixed much more quickly.

Even if you don't have much information on the bug, please open an issue anyways. others might have experienced similar.

# 💥 I want to fix a bug

Even better! Please read on how you can get involved.

There might be solutions to bugs which are deemed overly complex or unsatisfying. Please understand that these will be rejected at the maintainers discretion.

# 🚀 I like to add a feature

Awesome! Together, we can improve the live of future MUD gamers. The next sections will show you what you need to know.

Some feature extend the scope of a package or go against the packages philosophies, so they are not accepted. But maybe extension packages can be made.

# ❓ I want to improve the documentation

You're a godsend. Most people dislike writing documentation, so every helping hand is a boon.

Since the documentation also lives in the repository, you will also need the following sections.

# Ok now, how do I actually contribute content?

## Foreword

If you have no experience in development, but would like to start helping out, please feel free to contact the maintainers. We are happy to help you onboarding and getting up to speed. Everybody has to start somewhere.

## Tools

Simple fixes like typos or changes to sentences are easily made in the [GitHub UI](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files). For more complex changes, you can either use [GitHub Codespaces](https://docs.github.com/en/codespaces/overview) (cloud hosted development environments, customized to the project) or your local computer. For local development, you need git, node.js and NPM in a recent version installed.

## Development workflow

The following steps will set up your dev environment for code changes:
 - install the node dependencies using `npm ci`
 - run `npm run build` to build the package builder (needed for creating test packages)
 - a second `npm install` will set up the package builder correctly
 - do your changes
 - run unit tests using `npm run test`. This can be done both from the project root or individual packages (less unrelated output)
 - Debugging unit tests can be done in VSCode with the target `Jest debug`. You will need to choose the right package after starting the target.
 - To build an NXS file for testing, you can use the command `npm run nxs`. The file can be found in the `nxs` directory of the package.
 - Commit and push your files, then open a Pull Request.

## Documentation updates

The website and documentation use [Docusaurus](https://docusaurus.io/) to generate the site. After editing the files, you can use `npm run start` in the website directory to look at the expected result in your browser.

## Repository structure

The repository has the following structure:

```
| root                # repository root with package.json for common dependencies and configuration
+-+
| | packages          # subdirectory for individual packages. Each is its own resulting NXS
|
+-+
  | website           # website directory. This contains all documentation
  +-+
  | | blog            # "blog" part of the website. Used for release notes and other noteworthy announcements
  |
  +-+
  | | docs            # documentation part of the website with subdirectories for individual packages
  |
  +-+
    | src             # Static part of the page. Currently unused, the main README will be copied here on doc release
