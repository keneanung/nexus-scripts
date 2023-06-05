const baseConfig = require('../../jestconfig.js')

const config = {
  ...baseConfig,
  automock: false,
  resetMocks: false,
  testEnvironment: 'jsdom',
  snapshotSerializers: [
    "@emotion/jest/serializer"
  ]
}

module.exports = config