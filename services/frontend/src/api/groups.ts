const createGroup = (groupName, courseId) => window.api()
  .path('/groups/createGroup')
  .body({groupName, courseId})
  .executePost();

export const getGroups = () => window.api()
  .path('/groups/getGroups')
  .executePost();

export {
  createGroup
};