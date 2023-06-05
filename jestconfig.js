const {defaults} = require('jest-config');

/** @type {import('jest').Config} */
const config = {
  ...defaults,
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  testPathIgnorePatterns:[
      "/node_modules/",
      "/lib/"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  reporters: ["default", "jest-github-reporter"]
};

module.exports = config;
