const baseConfig = require('../../jestconfig.js')

const config = {
  ...baseConfig,
  moduleFileExtensions: [...baseConfig.moduleFileExtensions, 'jsr'],
  transform: {
    ...baseConfig.transform,
    "\\.jsr$": [
      'jest-text-transformer'
    ]
  }
}

module.exports = config