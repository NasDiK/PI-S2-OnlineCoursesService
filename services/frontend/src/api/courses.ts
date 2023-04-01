const searchCourses = () => window.api()
  .path('/courses/searchCourses')
  .executePost();

const getCoursesList = (usersIds) => window.api()
  .path('/courses/getCoursesList')
  .body({usersIds})
  .executePost();

export {
  searchCourses,
  getCoursesList
};