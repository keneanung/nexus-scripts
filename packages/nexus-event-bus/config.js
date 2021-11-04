// Set up your project here
const author = 'keneanung';  // author name on GitHub, might also be an org
const projectName = 'iron-realms-nexus-script-template'; // project name on GitHub
const libraryName = 'Greeter'; // name of the resulting library. Used by webpack to create a global name
const npmPackageName = 'nexus_script_template'; // Name of the NPM package that should be published
const projectDescription = 'Template for nexus scripts using typescript'; // Project description in the NPM package
const authorEmail = 'keneanung@gmail.com' // author email address
const docuTitle = 'Iron Realms Nexus Script Template'; // Title of the documentation website
const docuTagline = 'Making Nexus scripts easier'; // Used for documentation website


// don't modify the exports below (except to add new fields)
module.exports = {
    author,
    projectName,
    githubRepoWebUrl: `https://github.com/${author}/${projectName}`,
    githubRepoGitUrl: `git://github.com/${author}/${projectName}.git`,
    libraryName,
    npmPackageName,
    projectDescription,
    authorEmail,
    docuTitle,
    docuTagline,
}