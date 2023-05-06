const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getAllCourses,
  getCoursesListByUsers,
  searchCourses,
  createCourse,
  editCourse
} = require('../services/courses');

const controller = {
  getAllCourses: () => getAllCourses(knex),
  getCoursesListByUsers: (req) => getCoursesListByUsers(knex, req),
  searchCourses: (req) => searchCourses(knex, req),
  createCourse: (req) => createCourse(knex, req),
  editCourse: (req) => editCourse(knex, req)
};

module.exports = controller;
