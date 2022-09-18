import configData from './config.js';
import { writePackage } from 'write-pkg';
import fs from 'fs';

const json = JSON.parse(fs.readFileSync('./package.json'));

await writePackage(Object.assign(json, {
    name: configData.npmPackageName,
    description: configData.projectDescription,
    author: `${configData.author} <${configData.authorEmail}>`,
    repository: configData.githubRepoGitUrl
}))