const express = require('express');
const proxyMiddleWare = require('http-proxy-middleware');
const config = require('../config.js');
const utils = require('./utils');
// const contentRouter = require('./content');

let staticDir = '';
let templateRootDir = '';

if (process.env.NODE_ENV === 'production') {
  staticDir = config.static_dir_prod;
  templateRootDir = config.template_root_dir_prod;
} else {
  staticDir = config.static_dir_dev;
  templateRootDir = config.template_root_dir_dev;
}

const proxyOption = {
  target: 'http://123.207.172.63:9093/',
  changeOrigoin: true,
  ws: true,
  pathRewrite: { '^/api': '/' },
};

function init() {
  const app = express();

  app.use(express.static(staticDir, {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: (res) => {
      res.set('x-timestamp', Date.now());
    },
  }));

  app.use('/api', proxyMiddleWare(proxyOption));

  app.all('*', (req, res) => {
    utils.readContent(templateRootDir, 'index.html')
      .then((content) => {
        res.send(content);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.listen(config.port);
}

module.exports.init = init;
