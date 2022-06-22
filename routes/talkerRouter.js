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
  const newData = {
    id: await generateId(),
    name,
    age,
    talk,
  };
  await mainWrite(PATH, newData);
  const allTalkers = await mainRead(PATH);
  console.log('------ Palestrantes ---------');
  console.log(allTalkers);
  console.log('-----------------------------');
  return res.status(201).json(newData);
});

talkerRouter.put('/:id', async (req, res) => {
  const {
    name,
    age,
    talk,
  } = req.body;
  const { id } = req.params;
  const talkers = await mainRead(PATH);
  const talkerIndex = talkers.findIndex((tlkr) => tlkr.id === Number(id));
  console.log(talkers);
  const modifiedTalker = { ...talkers[talkerIndex], name, age, talk };
  const newTalkers = [...talkers, modifiedTalker];
  await mainWrite(PATH, newTalkers);
});

module.exports = talkerRouter;