const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const commonConfig = require('./webpack.common.js');
const config = require('../config');

const PUBLIC_PATH = config.public_path_prod;

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
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
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
              limit: 10240,
            },
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                imageminPngquant({
                  floyd: 0.5,
                  speed: 2,
                }),
                imageminMozjpeg({
                  progressive: true,
                  arithmetic: false,
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({})],
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: PUBLIC_PATH,
  },
};

module.exports = merge(commonConfig, prodConfig);
