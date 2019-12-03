const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common.js');
const config = require('../config');

const PORT = config.port;
const PUBLIC_PATH = config.public_path_dev;

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    overlay: true,
    contentBase: './dist',
    open: true,
    port: PORT,
    hot: true,
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     // { from: /^\/$/, to: '/views/landing.html' },
    //     // { from: /^\/subpage/, to: '/views/subpage.html' },
    //     { from: /./, to: `${PUBLIC_PATH}/index.html` }
    //   ],
    //   // index: `${PUBLIC_PATH}/index.html`,
    // },
    // proxy: {
    //   'xxx': {
    //     'target': 'xxx',
    //     'secure': false, //https
    //     'pathRewrite': {
    //       'xxx': 'xxx'
    //     },
    //     'changeOrigin': true,
    //     'header': {
    //       host: '',
    //       cookie: ''
    //     }
    //   }
    // }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      }, {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          'stylus-loader',
        ],
      }, {
        test: /\.(gif|png|jpg|mp3|mp4|obj|mtl|glb)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: PUBLIC_PATH,
  },
};

module.exports = merge(commonConfig, devConfig);
