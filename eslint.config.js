const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const jest = require("eslint-plugin-jest");
const jsdoc = require("eslint-plugin-jsdoc");
const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
        parser: tsParser,

        globals: {
            ...globals.node,
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
        jest,
        jsdoc,
    },

    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:jest/recommended",
        "plugin:jsdoc/recommended",
    ),

    rules: {
        "jsdoc/require-jsdoc": [1, {
            publicOnly: true,

            contexts: [
                "ClassExpression",
                "ClassDeclaration",
                "ClassProperty",
                "FunctionDeclaration",
                "ArrowFunctionExpression",
                "FunctionExpression",
                "FunctionExpression",
            ],
        }],

        "jsdoc/require-description": [1, {
            contexts: [
                "ClassExpression",
                "ClassDeclaration",
                "ClassProperty",
                "FunctionDeclaration",
                "ArrowFunctionExpression",
                "FunctionExpression",
                "FunctionExpression",
            ],
        }],

        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
            "caughtErrorsIgnorePattern": "^_",
        }],

        "jsdoc/no-undefined-types": [1, {
            "definedTypes": ["client", "EmotionJSX.Element"],
        }],
    },
}, globalIgnores(["**/node_modules", "**/lib", "**/coverage"])]);