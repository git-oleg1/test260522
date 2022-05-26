const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
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
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, './src/index.template.html'),
	}),
    new VueLoaderPlugin()
  ]
};
