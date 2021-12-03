const { getESLintConfig } = require('@iceworks/spec');

module.exports = getESLintConfig('react-ts', {
  rules: {
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    // 避免使用immer时，eslint报错：no-param-reassign
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draft'] }],
  },
});
