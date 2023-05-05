const getAllRoles = () => window.api()
  .path('/roles/getAllRoles')
  .executePost();

const setUsersRoles = (roleId, usersIds) => window.api()
  .path('/roles/setUsersRoles')
  .body({roleId, usersIds})
  .executePost();

export {
  getAllRoles,
  setUsersRoles
};