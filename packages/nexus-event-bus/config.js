// Set up your project here
const author = 'keneanung';  // author name on GitHub, might also be an org
const projectName = 'nexus-event-bus'; // project name on GitHub
const libraryName = 'eventBus'; // name of the resulting library. Used by webpack to create a global name
const npmPackageName = 'nexus-event-bus'; // Name of the NPM package that should be published
const projectDescription = 'Event bus/broker for the IRE Nexus client'; // Project description in the NPM package
const authorEmail = 'keneanung@gmail.com' // author email address
const docuTitle = 'Iron Realms Nexus Event Bus'; // Title of the documentation website
const docuTagline = 'Event bus/broker for the IRE Nexus client'; // Used for documentation website


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