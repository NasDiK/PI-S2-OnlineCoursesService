const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getAllCourses,
  getCoursesListByUsers
} = require('../services/courses');

const controller = {
  getAllCourses: () => getAllCourses(knex),
  getCoursesListByUsers: (req) => getCoursesListByUsers(knex, req)
};

module.exports = controller;
