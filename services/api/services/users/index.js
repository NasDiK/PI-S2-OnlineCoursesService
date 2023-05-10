const {getUsersByRoleName} = require('./getUsersByRoleName');
const {getUsersByGroup} = require('./getUsersByGroup');
const {getUsersByIds} = require('./getUsersByIds');
const {searchUsers} = require('./searchUsers');

module.exports = {
  getUsersByRoleName,
  getUsersByGroup,
  getUsersByIds,
  searchUsers
};