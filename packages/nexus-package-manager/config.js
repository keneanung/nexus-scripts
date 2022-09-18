// Set up your project here
const author = 'keneanung';  // author name on GitHub, might also be an org
const projectName = 'nexus-package-manager'; // project name on GitHub
const libraryName = 'PackageManager'; // name of the resulting library. Used by webpack to create a global name
const npmAuthorName = 'keneanung'; // name of the author for NPM
const npmPackageName = 'nexus-package-manager'; // Name of the NPM package that should be published
const projectDescription = 'Package Manager for the Iron Realms Nexus 3 client'; // Project description in the NPM package
const authorEmail = 'keneanung@gmail.com' // author email address
const docuTitle = 'Iron Realms Nexus Package Manager'; // Title of the documentation website
const docuTagline = 'The original package manager for Iron Realms Nexus'; // Used for documentation website


// don't modify the exports below (except to add new fields)
module.exports = {
    author,
    projectName,
    githubRepoWebUrl: `https://github.com/${author}/${projectName}`,
    githubRepoGitUrl: `git://github.com/${author}/${projectName}.git`,
    libraryName,
    npmPackageName: `@${npmAuthorName}/${npmPackageName}`,
    projectDescription,
    authorEmail,
    docuTitle,
    docuTagline,
}