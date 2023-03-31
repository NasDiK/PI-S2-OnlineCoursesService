const searchCourses = () => window.api()
  .path('/courses/searchCourses')
  .body({})
  .executePost();

export {
  searchCourses
};