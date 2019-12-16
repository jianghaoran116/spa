const express = require('express');

const Router = express.Router();

Router.get('/content', (req, res) => res.json([
  {
    title: 'title-1',
  },
  {
    title: 'title-2',
  },
]));

module.exports = Router;
