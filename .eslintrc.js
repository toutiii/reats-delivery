module.exports = {
    root: true,
    ignorePatterns: ["!source/**/*"],
    rules: {},
    overrides: [
        {
            files: ["source/**/*.js", "source/**/*.jsx", "source/**/*.ts", "source/**/*.tsx"],
            rules: {
                "react-hooks/exhaustive-deps": 0,
                "@typescript-eslint/no-require-imports": 0
            }
        }
    ]
};
