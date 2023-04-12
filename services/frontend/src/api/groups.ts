const createGroup = (groupName, courseId) => window.api()
  .path('/groups/createGroup')
  .body({groupName, courseId})
  .executePost();

const getGroups = () => window.api()
  .path('/groups/getGroups')
  .executePost();

const getUsersInGroups = (groupId) => window.api()
  .path('/groups/getUsersInGroups')
  .body({groupId})
  .executePost();

const saveGroupChanges = (groupId, usersIds) => window.api()
  .path('/groups/saveGroupChanges')
  .body({groupId, usersIds})
  .executePost();

export {
  createGroup,
  getGroups,
  getUsersInGroups,
  saveGroupChanges
};