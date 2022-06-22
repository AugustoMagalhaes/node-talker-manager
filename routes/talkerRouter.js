const express = require('express');

const talkerRouter = express.Router();

const mainRead = require('../helpers/mainRead');
const mainWrite = require('../helpers/mainWrite');
const authMiddleware = require('../middlewares/authMiddleware');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const generateId = require('../helpers/generateId');

const PATH = 'talker.json';

talkerRouter.get('/', async (req, res) => {
  const data = await mainRead(PATH);
  return res.status(200).json(data);
});

talkerRouter.get('/search', authMiddleware, async (req, res) => {
  const { q } = req.query;
  const talkers = await mainRead(PATH);

  if (!q) return res.status(200).json(talkers);

  const filteredTalkers = talkers.filter((tlkr) => tlkr.name.includes(q));

  if (filteredTalkers.length === 0) return res.status(200).json([]);
  return res.status(200).json(filteredTalkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await mainRead(PATH);

  const foundTalker = data.find((el) => el.id === Number(id));

  if (foundTalker) return res.status(200).json(foundTalker);

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRouter.use(authMiddleware);

talkerRouter.post('/', validateName,
validateTalk,
validateAge,
async (req, res) => {
  const { name, age, talk } = req.body;

  const newTalker = {
    id: await generateId(),
    name,
    age,
    talk,
  };

  const data = await mainRead(PATH);
  const newData = [...data, newTalker];

  await mainWrite(PATH, newData);
  return res.status(201).json(newTalker);
});

talkerRouter.put('/:id', validateName,
validateTalk,
validateAge,
async (req, res) => {
  const {
    name,
    age,
    talk,
  } = req.body;

  const { id } = req.params;
  const talkers = await mainRead(PATH);
  const talkerIndex = talkers.findIndex((tlkr) => tlkr.id === Number(id));

  const modifiedTalker = { id: Number(id), name, age, talk };
  talkers[talkerIndex] = modifiedTalker;

  await mainWrite(PATH, talkers);

  return res.status(200).json(talkers[talkerIndex]);
});

talkerRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await mainRead(PATH);
  const deleteIndex = talkers.findIndex((tlkr) => tlkr.id === Number(id));

  if (deleteIndex === -1) return res.status(404).json({ message: 'Palestrante não encontrado' });

  talkers.splice(deleteIndex, 1);
  await mainWrite(PATH, talkers);

  return res.status(204).end();
});

module.exports = talkerRouter;