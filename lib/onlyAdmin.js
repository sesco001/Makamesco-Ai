


const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../fredie/onlyAdmin.json');

// Load data from JSON file
function loadOnlyAdminData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return new Set(JSON.parse(data));
  } catch (err) {
    return new Set(); // If file doesn't exist, start with an empty set
  }
}

// Save data to JSON file
