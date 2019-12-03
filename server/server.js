const express = require('express');
const config = require('../config.js');
const utils = require('./utils');

let staticDir = '';
let templateRootDir = '';

if (process.env.NODE_ENV === 'production') {
  staticDir = config.static_dir_dev
  templateRootDir = config.template_root_dir_dev
} else {
  staticDir = config.static_dir_prod
  templateRootDir = config.template_root_dir_prod
};

function init() {
  const app = express();

  app.use(config.public_path_dev, express.static(staticDir));

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
