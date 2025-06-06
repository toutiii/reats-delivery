module.exports = {
    root: true,
    extends: ["./source/.eslintrc.js"],
    parserOptions: {
        project: "./source/tsconfig.json"
    },
    rules: {
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-require-imports": "off"
    }
};
