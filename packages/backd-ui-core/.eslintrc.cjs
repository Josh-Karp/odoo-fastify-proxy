module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended'],
  overrides: [{
    "files": ["*.jsx"],
    "rules": {
      "react/jsx-props-no-spreading": "off",
      "no-use-before-define": "off"
    }
  }],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {}
};