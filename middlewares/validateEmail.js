const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);
  const testValidation = emailRegex.test(email);
  // fonte: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  if (!testValidation) {
    return res.status(400).json({ message: 'Invalid email!' });
  }
  next();
};

module.exports = validateEmail;