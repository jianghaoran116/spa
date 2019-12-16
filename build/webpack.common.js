const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');

let publicPath = ''; // HtmlWebpackPlugin给ejs模版设置路径
let rootPath = ''; // 静态根html路径

if (process.env.NODE_ENV === 'production') {
  publicPath = config.public_path_prod;
  rootPath = config.template_root_dir_prod;
} else {
  publicPath = config.public_path_dev;
  rootPath = config.template_root_dir_dev;
}

const plugins = [
  new HtmlWebpackPlugin({
    filename: `${rootPath}/index.html`,
    template: path.resolve(__dirname, '../src/html-templates/app.ejs'),
    page: config.page,
    public_path: publicPath,
  }),
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../'),
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].[chunkhash].css',
    chunkFilename: '[id].[chunkhash].css',
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
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

module.exports = {
  entry: {
    main: './src/app.jsx',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // loader: 'babel-loader',
        use: ['babel-loader', 'eslint-loader'],
      }, {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  plugins,
  optimization: {
    usedExports: true, // tree shaking
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // filename: 'vendors.js',
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js',
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  output: {
    path: path.resolve(__dirname, '../dist/static/'),
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 样式文件后缀不建议配置
    alias: {
      '@/view': path.resolve(__dirname, '../src/view'),
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/imagespath': path.resolve(__dirname, '../src/styles/images'),
    },
    // mainFiles: ['index'], // 路径下的默认文件
  },
};
