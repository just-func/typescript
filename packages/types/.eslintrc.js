module.exports = {
  'env': {
    'es6': true,
    'jest': true,
    'node': true
  },
  'extends': 'plugin:harmony/latest',
  'overrides': [
    {
      'extends': 'plugin:harmony/ts-recommended',
      'files': [
        '*.ts',
        '*.tsx'
      ]
    }
  ]
}
