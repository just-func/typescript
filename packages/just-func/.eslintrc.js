const path = require('node:path')

module.exports = {
  'env': {
    'es6': true,
    'jest': true,
    'node': true
  },
  'extends': 'plugin:harmony/latest',
  'overrides': [
    {
      'extends': 'plugin:harmony/ts-recommended-type-check',
      'files': [
        '*.ts',
        '*.tsx'
      ],
      'parserOptions': {
        'project': path.join(__dirname, './tsconfig.json')
      }
    }
  ],
  'root': true
}
