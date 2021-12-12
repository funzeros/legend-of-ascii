module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
    'no-extend-native': ['error', { exceptions: ['Object', 'String'] }],
  },
};
