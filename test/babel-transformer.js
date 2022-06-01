const config = require('../babel.config');

const { createTransformer } = require('babel-jest').default;

module.exports = createTransformer({
  ...config,
});
