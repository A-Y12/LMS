const webpack = require('webpack');

module.exports = function override(config) {
  // Add polyfills for missing Node.js core modules in Webpack 5
  config.resolve.fallback = {
    process: require.resolve('process/browser.js'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    util: require.resolve('util/'),
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
    assert: require.resolve('assert/'),
    url: require.resolve('url/'),
  };

  // Add process and Buffer to global scope
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
