const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  const dateRegExp = new RegExp(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const checkDateFormat = dateRegExp.test(watchedAt);

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' }); 
  }
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!checkDateFormat) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validateTalk;