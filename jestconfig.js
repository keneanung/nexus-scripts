const {defaults} = require('jest-config');
const path = require('node:path');

const swcTypeScriptTransform = [
  '@swc/jest',
  {
    module: {
      type: 'commonjs',
    },
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: false,
      },
      transform: {
        react: {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
      target: 'es2022',
    },
  },
];

const swcJavaScriptTransform = [
  '@swc/jest',
  {
    module: {
      type: 'commonjs',
    },
    jsc: {
      parser: {
        syntax: 'ecmascript',
        jsx: true,
      },
      transform: {
        react: {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
      target: 'es2022',
    },
  },
];

/** @type {import('jest').Config} */
const config = {
  ...defaults,
  transform: {
    '^.+\\.tsx?$': swcTypeScriptTransform,
    '^.+\\.(m?jsx?)$': swcJavaScriptTransform,
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(uuid|msw|@mswjs|until-async|headers-polyfill|is-node-process|outvariant|strict-event-emitter|graphql|graphql-tag|cookie|set-cookie-parser|rettime)/)',
  ],
  testPathIgnorePatterns:[
      "/node_modules/",
      "/lib/"
  ],
  setupFilesAfterEnv: [path.join(__dirname, 'jest.setup.js')],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};

module.exports = config;
