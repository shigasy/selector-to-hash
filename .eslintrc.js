module.exports = {
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended",
    'plugin:prettier/recommended',
    "prettier/@typescript-eslint"
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
}
