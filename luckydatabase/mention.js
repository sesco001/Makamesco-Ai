const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../fredie/mention.json');

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch { return {}; }
}
function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
if (!fs.existsSync(filePath)) saveData({});

async function addOrUpdateDataInMention(url, type, message) {
  const data = loadData();
  data[url] = { url, type, message, status: 'oui' };
  saveData(data);
}

async function recupererToutesLesValeurs() {
  const data = loadData();
  return Object.values(data);
}

async function modifierStatusId1(status) {
  const data = loadData();
  const keys = Object.keys(data);
  if (keys.length > 0) {
    data[keys[0]].status = status;
    saveData(data);
  }
}

async function getAllMentions() {
  return loadData();
}

async function removeFromMentionList(url) {
  const data = loadData();
  delete data[url];
  saveData(data);
}

module.exports = {
  addOrUpdateDataInMention,
  recupererToutesLesValeurs,
  modifierStatusId1,
  getAllMentions,
  removeFromMentionList,
};
