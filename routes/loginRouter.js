const express = require('express');

const loginRouter = express.Router();

const generateToken = require('../helpers/generateToken');

loginRouter.post('/', async (req, res) => {
  const token = generateToken(16);
  return res.status(200).json({ token });
});

module.exports = loginRouter;