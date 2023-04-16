const {createGroup} = require('./createGroup');
const {getGroups} = require('./getGroups');
const {getUsersInGroup} = require('./getUsersInGroup');
const {saveGroupChanges} = require('./saveGroupChanges');

module.exports = {
  createGroup,
  getGroups,
  saveGroupChanges,
  getUsersInGroup
};