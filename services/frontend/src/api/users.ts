const getUsersByRoleName = (roleName) => window.api()
  .path('/users/getUsersByRoleName')
  .body({roleName})
  .executePost();

export {
  getUsersByRoleName
};