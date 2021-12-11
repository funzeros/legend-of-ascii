module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': ['google'],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': ['@typescript-eslint'],
  'rules': {
    'no-unused-vars': ['error', {varsIgnorePattern: '.*', args: 'none'}],
    'max-len': ['error', {'code': 100}],
    'no-extend-native': ['error', {'exceptions': ['Object', 'String']}],
    'indent': ['error', 2],
  },
};
