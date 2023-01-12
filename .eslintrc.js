module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "jest"],
  rules: {
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-shadow": "off",
    "no-bitwise": "off",
    "max-classes-per-file": "off",
    "no-nested-ternary": "off",
    "no-restricted-syntax": "off",
    "no-plusplus": "off",
  },
};
