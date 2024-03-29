const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.ts',
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd",
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ],
  }
}