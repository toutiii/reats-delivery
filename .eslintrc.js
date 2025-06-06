module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    extends: [
        "eslint:recommended"
    ],
    overrides: [
        {
            files: [
                "source/**/*.ts",
                "source/**/*.tsx"
            ],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
                project: "./source/tsconfig.json",
            },
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            rules: {
                "react-hooks/exhaustive-deps": "off",
                "@typescript-eslint/no-require-imports": "off"
            }
        }
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"]
    }
};
