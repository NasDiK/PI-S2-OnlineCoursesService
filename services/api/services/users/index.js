const {getUsersByRoleName} = require('./getUsersByRoleName');
const {getUsersByGroup} = require('./getUsersByGroup');
const {getUsersByIds} = require('./getUsersByIds');
const {searchUsers} = require('./searchUsers');
const {setUserInfo} = require('./setUserInfo');
const {deleteUserById} = require('./deleteUserById');

module.exports = {
  getUsersByRoleName,
  getUsersByGroup,
  getUsersByIds,
  searchUsers,
  setUserInfo,
  deleteUserById
};