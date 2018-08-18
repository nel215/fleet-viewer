const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new VueLoaderPlugin(),
  ],
  entry: [
    'babel-polyfill',
    path.resolve('src', 'index.js')
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  }
};
