/* eslint-disable no-param-reassign */
const path = require('path');
const { override } = require('customize-cra');

const aliasOverride = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  };

  return config;
};

module.exports = override(aliasOverride);
