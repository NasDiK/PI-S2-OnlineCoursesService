const {getAllCourses} = require('./getAllCourses');
const {getCoursesListByUsers} = require('./getCoursesListByUsers');
const {searchCourses} = require('./searchCourses');
const {createCourse} = require('./createCourse');

module.exports = {
  getAllCourses,
  getCoursesListByUsers,
  searchCourses,
  createCourse
};