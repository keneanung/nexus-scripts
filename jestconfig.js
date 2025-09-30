const {defaults} = require('jest-config');

/** @type {import('jest').Config} */
const config = {
  ...defaults,
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  // Allow transforming ESM uuid package (v13) which otherwise ships untranspiled ESM
  transformIgnorePatterns: [
    "/node_modules/(?!(uuid)/)"
  ],
  testPathIgnorePatterns:[
      "/node_modules/",
      "/lib/"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};

module.exports = config;
