const express = require('express');

const loginRouter = express.Router();

const generateToken = require('../helpers/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

loginRouter.post('/', validateEmail, validatePassword, async (req, res) => {
  const token = generateToken(16);
  return res.status(200).json({ token });
});

module.exports = loginRouter;