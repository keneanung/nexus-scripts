module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'jest',
      'jsdoc',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:jest/recommended',
      'plugin:jsdoc/recommended',
    ],
    rules: {
      'jsdoc/require-jsdoc': [1, { publicOnly: true, contexts: ['ClassExpression', 'ClassDeclaration', 'ClassProperty', 'FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression', 'FunctionExpression'] }],
      'jsdoc/require-description': [1, { contexts: ['ClassExpression', 'ClassDeclaration', 'ClassProperty', 'FunctionDeclaration', 'ArrowFunctionExpression', 'FunctionExpression', 'FunctionExpression'] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "jsdoc/no-undefined-types": [1, {
        "definedTypes": [
          "client"
        ]
      }]
    },
    ignorePatterns: ['node_modules', 'lib'],
    env: {
      node: true
    }
  };