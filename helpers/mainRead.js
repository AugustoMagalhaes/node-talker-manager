const fs = require('fs').promises;

const talkerFile = 'talker.json';

const mainRead = async () => {
  try {
    const data = await fs.readFile(talkerFile, 'utf-8');
    console.log(data);
  } catch (err) {
    throw new Error('Impossible to read file.');
  }
};

mainRead();

module.exports = mainRead;