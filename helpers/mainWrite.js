const fs = require('fs').promises;
const mainRead = require('./mainRead');

const mainWrite = async (PATH, newData) => {
  try {
    const data = await mainRead(PATH);
    data.push(newData);
    const striginfiedData = JSON.stringify(data);
    await fs.writeFile(PATH, striginfiedData);
  } catch (err) {
    throw new Error(`Impossible to write in ${PATH}`);
  }
};

module.exports = mainWrite;