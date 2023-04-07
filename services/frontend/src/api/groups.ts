const createGroup = (groupName, courseId) => window.api()
  .path('/groups/createGroup')
  .body({groupName, courseId})
  .executePost();

export const getGroups = () => window.api()
  .path('/groups/getGroups')
  .executePost();

export const getUsersInGroups = (groupId) => window.api()
  .path('/groups/getUsersInGroups')
  .body({groupId})
  .executePost();

export const saveGroupChanges = (groupId, usersIds) => window.api()
  .path('/groups/saveGroupChanges')
  .body({groupId, usersIds})
  .executePost();

export {
  createGroup
};