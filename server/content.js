const express = require('express');

const Router = express.Router();

Router.get('/detail', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://www.curlyhair.cn');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.json([
    {
      title: 'title-1',
    },
    {
      title: 'title-2',
    },
  ]);
});

module.exports = Router;
