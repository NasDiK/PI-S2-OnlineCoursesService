const getRolesByName = (roleName) => window.api()
  .path('/roles/getRolesByName')
  .body({roleName})
  .executePost();

const getRoles = () => window.api()
  .path('/roles/getRoles')
  .executePost();

const setNewRole = (roleId, usersIds) => window.api()
  .path('/roles/setNewRole')
  .body({roleId, usersIds})
  .executePost();

export {
  getRolesByName,
  getRoles,
  setNewRole
};