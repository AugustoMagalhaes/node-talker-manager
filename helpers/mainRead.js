const fs = require('fs').promises;

const mainRead = async (PATH) => {
  try {
    const data = await fs.readFile(PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Impossible to read file: ${err.message}`);
  }
};

module.exports = mainRead;