const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!Number.isInteger(age) || !age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = validateAge;