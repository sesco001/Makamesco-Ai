


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
function saveOnlyAdminData(onlyAdminSet) {
  try {
    const data = JSON.stringify([...onlyAdminSet]);
    fs.writeFileSync(filePath, data, 'utf8');
  } catch (err) {
    console.error('Error saving admin-only data:', err);
  }
}

// Check if a group is in admin-only mode
function isGroupOnlyAdmin(groupId) {
  try {
    const onlyAdminData = loadOnlyAdminData();
    return onlyAdminData.has(groupId);
  } catch (err) {
    console.error('Error checking admin-only status:', err);
    return false;
  }
}

// Add a group to admin-only list
function addGroupToOnlyAdminList(groupId) {
  try {
    const onlyAdminSet = loadOnlyAdminData();
    onlyAdminSet.add(groupId);
    saveOnlyAdminData(onlyAdminSet);
    return true;
  } catch (err) {
    console.error('Error adding group to admin-only list:', err);
    return false;
  }
}

// Remove a group from admin-only list
function removeGroupFromOnlyAdminList(groupId) {
  try {
    const onlyAdminSet = loadOnlyAdminData();
    onlyAdminSet.delete(groupId);
    saveOnlyAdminData(onlyAdminSet);
    return true;
  } catch (err) {
    console.error('Error removing group from admin-only list:', err);
    return false;
  }
}

// Toggle admin-only mode for a group (optional utility function)
function toggleGroupOnlyAdmin(groupId) {
  try {
    const onlyAdminSet = loadOnlyAdminData();
    
    if (onlyAdminSet.has(groupId)) {
      onlyAdminSet.delete(groupId);
      saveOnlyAdminData(onlyAdminSet);
      return false; // Disabled
    } else {
      onlyAdminSet.add(groupId);
      saveOnlyAdminData(onlyAdminSet);
      return true; // Enabled
    }
  } catch (err) {
    console.error('Error toggling admin-only status:', err);
    return false;
  }
}

// Export all functions for use in main file
module.exports = {
  loadOnlyAdminData,
  saveOnlyAdminData,
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList,
  toggleGroupOnlyAdmin  // Optional - you can remove if not needed
};
