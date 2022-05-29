const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: [
    './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/app.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@c': path.resolve(__dirname, 'src/components/'),
      '@v': path.resolve(__dirname, 'src/views/'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true, // If you are using the options api.
      __VUE_PROD_DEVTOOLS__: false, // If you don't want people sneaking around your components in production.
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.template.html'),
      inject: true
    }),
    new VueLoaderPlugin()
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()])
};
