const express = require('express');

const talkerRouter = express.Router();

const mainRead = require('../helpers/mainRead');

const PATH = 'talker.json';

talkerRouter.get('/', async (req, res) => {
  const data = await mainRead(PATH);
  return res.status(200).json(data);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await mainRead(PATH);
  const foundTalker = data.find((el) => el.id === Number(id));
  if (foundTalker) return res.status(200).json(foundTalker);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talkerRouter;