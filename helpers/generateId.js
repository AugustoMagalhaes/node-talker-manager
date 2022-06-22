const mainRead = require('./mainRead');

const PATH = 'talker.json';

const generateId = async () => {
  const talkers = await mainRead(PATH);
  const talkersLength = talkers.length;
  return talkersLength + 1;
};

module.exports = generateId;