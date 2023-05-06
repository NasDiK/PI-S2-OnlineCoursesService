const {getAllCourses} = require('./getAllCourses');
const {getCoursesListByUsers} = require('./getCoursesListByUsers');
const {searchCourses} = require('./searchCourses');
const {createCourse} = require('./createCourse');
const {editCourse} = require('./editCourse');

module.exports = {
  getAllCourses,
  getCoursesListByUsers,
  searchCourses,
  createCourse,
  editCourse
};