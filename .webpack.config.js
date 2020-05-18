const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = config => {
  config.target = 'electron-renderer';
  config.output = {
    path: path.join(__dirname, 'build')
  };
  config.plugins = [
    ...config.plugins,
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'node_modules/tesseract.js/dist/worker.min.js'), to: path.resolve(__dirname, 'build/static/vendor') },
        { from: path.resolve(__dirname, 'node_modules/tesseract.js/dist/worker.min.js.map'), to: path.resolve(__dirname, 'build/static/vendor') },
        { from: path.resolve(__dirname, 'node_modules/tesseract.js-core/tesseract-core.wasm.js'), to: path.resolve(__dirname, 'build/static/vendor') },
        { from: path.resolve(__dirname, 'lang-data'), to: path.resolve(__dirname, 'build/static/vendor/lang-data') },
      ],
    }),
  ];

  console.log('config', config)

  return config;
}
