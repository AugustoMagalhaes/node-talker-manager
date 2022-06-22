const fs = require('fs').promises;
const mainRead = require('./mainRead');

const mainWrite = async (PATH, newData) => {
  try {
    const data = await mainRead(PATH);
    const appendedData = [...data, newData];
    const striginfiedData = JSON.stringify(appendedData);
    await fs.writeFile(PATH, striginfiedData);
  } catch (err) {
    throw new Error(`Impossible to write in ${PATH}`);
  }
};

module.exports = mainWrite;