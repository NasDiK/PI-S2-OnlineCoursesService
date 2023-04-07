const getAllCurses = () => window.api()
  .path('/courses/getAllCurses')
  .executePost();

const getCoursesListByUsers = (usersIds) => window.api()
  .path('/courses/getCoursesListByUsers')
  .body({usersIds})
  .executePost();

export {
  getAllCurses,
  getCoursesListByUsers
};