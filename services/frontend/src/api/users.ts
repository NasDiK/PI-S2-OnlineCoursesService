const getUsersByRoleName = (roleName) => window.api()
  .path('/users/getUsersByRoleName')
  .body({roleName})
  .executePost();

const getUsersByGroup = (groupId) => window.api()
  .path('/users/getUsersByGroup')
  .body({groupId})
  .executePost();

export {
  getUsersByRoleName,
  getUsersByGroup
};