const fs = require('fs').promises;

const mainWrite = async (PATH, newData) => {
  try {
    const striginfiedData = JSON.stringify(newData);
    await fs.writeFile(PATH, striginfiedData);
  } catch (err) {
    throw new Error(`Impossible to write in ${PATH}`);
  }
};

module.exports = mainWrite; 

/* const data = await mainRead(PATH);
    const appendedData = [...data, newData];
    const striginfiedData = JSON.stringify(appendedData); */