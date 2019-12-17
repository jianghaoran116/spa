const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const config = require('../config');


const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/html-templates/app.ejs'),
    page: config.page,
  }),
  new webpack.DefinePlugin({
    WEBPACK_DEV_SERVER: JSON.stringify(true),
  }),
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach((file) => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file),
    }));
  }
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file),
    }));
  }
});

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    overlay: true,
    contentBase: '../dist',
    open: true,
    port: 8383,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: config.io.server_host_dev,
        changeOrigin: true,
      },
    },
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
  plugins,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
};

module.exports = merge(commonConfig, devConfig);
