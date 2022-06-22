const messages = {
  missTalk: 'O campo "talk" é obrigatório',
  missWatched: 'O campo "watchedAt" é obrigatório',
  missRate: 'O campo "rate" é obrigatório',
  failedWatched: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  failedRate: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const checkWatchedAt = (req) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) return messages.missWatched;

  const dateRegExp = new RegExp(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[12][0-9]{3}$/);
  const checkDateFormat = dateRegExp.test(watchedAt);

  if (!checkDateFormat) return messages.failedWatched;
  return true;
};

const checkRate = (req) => {
  const { talk: { rate } } = req.body;

  if (!rate && rate !== 0) return messages.missRate;
  if (rate < 1 || rate > 5) return messages.failedRate;
  return true;
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) return res.status(400).json({ message: messages.missTalk });

  const checkedWatched = checkWatchedAt(req);
  const checkedRate = checkRate(req);

  if (typeof checkedWatched !== 'boolean') {
    return res.status(400).json({ message: checkedWatched });
  }
  if (typeof checkedRate !== 'boolean') {
    return res.status(400).json({ message: checkedRate });
  }
  next();
};

module.exports = validateTalk;