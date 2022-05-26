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
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, './src/index.template.html'),
		// publicPath: '/js'
	}),
    new VueLoaderPlugin()
  ]
};
