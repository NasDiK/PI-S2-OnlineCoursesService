const getRolesByName = (roleName) => window.api()
  .path('/roles/getRolesByName')
  .body({roleName})
  .executePost();

const getRoles = () => window.api()
  .path('/roles/getRoles')
  .executePost();

export {
  getRolesByName,
  getRoles
};