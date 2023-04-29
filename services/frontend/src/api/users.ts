const getUsersByRoleName = (roleName) => window.api()
  .path('/users/getUsersByRoleName')
  .body({roleName})
  .executePost();

const getUsersByGroup = (groupId) => window.api()
  .path('/users/getUsersByGroup')
  .body({groupId})
  .executePost();

const getUsersByIds = (usersIds) => window.api()
  .path('/users/getUsersByIds')
  .body({usersIds})
  .executePost();

export {
  getUsersByRoleName,
  getUsersByGroup,
  getUsersByIds
};