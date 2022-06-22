const validateName = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  next();
};

module.exports = validateName;