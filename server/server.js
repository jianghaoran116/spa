const express = require('express');
const config = require('../config.js');
const utils = require('./utils');

function init() {
  const app = express();

  app.use(config.public_path_dev, express.static(config.static_dir_dev));

  app.all('*', (req, res) => {
    utils.readContent(config.template_root_dir_dev, 'index.html')
      .then((content) => {
        res.send(content);
      });
  });

  app.listen(config.port);
}

module.exports.init = init;
