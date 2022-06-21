const crypto = require('crypto');

const generateToken = (size) => crypto.randomBytes(size / 2).toString('hex');

module.exports = generateToken;