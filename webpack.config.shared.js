const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const comments = require('postcss-discard-comments');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');

const smp = new SpeedMeasurePlugin();

module.exports = (baseHref, baseApiUrl) => smp.wrap({
  entry: {
    main: `webpack-polyfill-injector?${JSON.stringify({
      modules: [
        './src/index.js'
      ]
    })}!`
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'scripts/[name].[hash:8].js'
  },
  optimization: { minimize: true },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'env'],
          plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
        }
      }
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: 'inline',
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              comments({ removeAll: true }),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9'
                ],
                flexbox: 'no-2009'
              })
            ]
          }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }]
      })
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'webfonts',
          publicPath: '../webfonts'
        }
      }
    }, {
      loader: require.resolve('file-loader'),
      exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.(css|scss)$/, /\.json$/, /\.(woff|woff2|eot|ttf|otf)$/],
      options: { name: 'media/[name].[hash:8].[ext]' }
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
    }
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new PolyfillInjectorPlugin({
      polyfills: [
        'Promise',
        'Array.prototype.find',
        'Number.isInteger'
      ]
    }),
    new ExtractTextPlugin('styles/[name].[hash:8].css'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new PrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message);
      },
      minify: true,
      navigateFallback: './public/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new CopyWebpackPlugin([
      './public/.htaccess',
      '!./public/index.html'
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'HOMEPAGE': JSON.stringify(baseHref),
      'BASE_API_URL': JSON.stringify(baseApiUrl)
    }),
    
    new ManifestPlugin({ fileName: 'asset-manifest.json' })
  ]
});

