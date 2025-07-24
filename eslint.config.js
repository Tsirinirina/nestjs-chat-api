const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslintEslintPlugin = require("@typescript-eslint/eslint-plugin");
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
    languageOptions: {
        parser: tsParser,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
            tsconfigRootDir: __dirname,
        },

        globals: {
            ...globals.node,
            ...globals.jest,
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslintEslintPlugin,
    },

    extends: compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),

    rules: {
        "@typescript-eslint/ban-ts-comment": "error",

        "@typescript-eslint/naming-convention": ["error", {
            selector: "enumMember",
            format: ["UPPER_CASE"],
        }],

        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/unified-signatures": "error",
        "no-inline-comments": "error",
        "max-lines-per-function": ["error", 55],
        "max-params": ["error", 5],

        complexity: ["error", {
            max: 7,
        }],

        "constructor-super": "error",
        curly: "error",
        "default-case": "error",
        "dot-notation": "error",
        eqeqeq: ["error", "always"],
        "id-blacklist": ["error", "any", "number", "string", "boolean", "Undefined"],
        "id-match": "error",
        "max-classes-per-file": ["off", 1],
        "no-param-reassign": "error",

        quotes: ["error", "single", {
            avoidEscape: true,
            allowTemplateLiterals: true,
        }],

        "max-lines": ["error", 400],
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-debugger": "error",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-extra-semi": "off",
        "no-fallthrough": "error",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-null/no-null": "off",
        "no-restricted-imports": ["error"],
        "no-return-await": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-console": "error",

        "no-unused-expressions": ["error", {
            allowShortCircuit: true,
        }],

        "no-unused-labels": "error",
        "no-useless-constructor": "off",
        "no-var": "error",
        "object-shorthand": "error",

        "padding-line-between-statements": ["off", {
            blankLine: "always",
            prev: "*",
            next: "return",
        }],

        "prefer-arrow-callback": "error",

        "prefer-const": ["error", {
            destructuring: "all",
        }],

        "prefer-template": "error",
        radix: "error",
        "spaced-comment": "error",
        "use-isnan": "error",
        "valid-typeof": "off",
        yoda: "error",
        "no-implicit-coercion": "error",
        "arrow-body-style": ["error", "as-needed"],
        camelcase: "error",
        "require-await": "error",
    },
}, globalIgnores(["**/.eslintrc.js"])]);
