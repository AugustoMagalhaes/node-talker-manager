const validateAge = (req, res, next) => {
  const { age } = req.body;
  next();
};