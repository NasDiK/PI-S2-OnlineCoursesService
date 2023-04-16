const getAllCourses = () => window.api()
  .path('/courses/getAllCourses')
  .executePost();

const getCoursesListByUsers = (usersIds) => window.api()
  .path('/courses/getCoursesListByUsers')
  .body({usersIds})
  .executePost();

export {
  getAllCourses,
  getCoursesListByUsers
};