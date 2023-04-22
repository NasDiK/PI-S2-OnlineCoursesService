const {createGroup} = require('./createGroup');
const {getGroups} = require('./getGroups');
const {getGroupsById} = require('./getGroupsById');
const {getUsersInGroup} = require('./getUsersInGroup');
const {saveGroupChanges} = require('./saveGroupChanges');

module.exports = {
  createGroup,
  getGroups,
  saveGroupChanges,
  getUsersInGroup,
  getGroupsById
};