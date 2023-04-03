const getUsersByRole = (roleId) => window.api()
  .path('/users/getUsersByRole')
  .body({roleId})
  .executePost();

export {
  getUsersByRole
};