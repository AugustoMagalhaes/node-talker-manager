const express = require('express');

const talkerRouter = express.Router();

const mainRead = require('../helpers/mainRead');

const PATH = 'talker.json';

talkerRouter.get('/', async (req, res) => {
  const data = await mainRead(PATH);
  return res.status(200).json(data);
});

module.exports = talkerRouter;