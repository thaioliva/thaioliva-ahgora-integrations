const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  entry: ['react-hot-loader/patch', './src/index.js'],
  output: { pathinfo: true },
  mode: 'development',
  devtool: 'eval',
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 9001
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        'thread-loader',
        'cache-loader', {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'env'],
            plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
          }
        }
      ]
    }, {
      test: /\.(scss|css)$/,
      use: ['thread-loader', 'cache-loader', 'style-loader', 'css-loader', 'sass-loader']
    }, {
      loader: require.resolve('file-loader'),
      exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.(css|scss)$/, /\.json$/]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      core: path.resolve(__dirname, './src/core/'),
      static: path.resolve(__dirname, './public/'),
      components: path.resolve(__dirname, './src/components/'),
      lib: path.resolve(__dirname, './src/lib/'),
      containers: path.resolve(__dirname, './src/containers/'),
      utils: path.resolve(__dirname, './src/utils/'),
      services: path.resolve(__dirname, './src/services/')
      // ahgUI: path.resolve(__dirname, './ahg-ui/src/')
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'HOMEPAGE': JSON.stringify('/'),
      'process.env.NODE_ENV': JSON.stringify('development'),
      'BASE_API_URL': JSON.stringify('https://localhost:8010/api/')
    })
  ]
});
