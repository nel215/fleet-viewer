module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base'],
  rules: {
    'no-undef': 'off',
    'no-new': 'off',
    'no-console': 'off',
    'no-restricted-globals': [0, 'name'],
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: 'typescript-eslint-parser',
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
