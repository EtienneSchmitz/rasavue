module.exports = {
  'env': {
    'es6': true,
    'node': true
  },
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
        // note you must disable the base rule as it can report incorrect errors
        "no-unused-vars": "off",
        //"typescript/no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
  }
}
