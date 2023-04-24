const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getAllCourses,
  getCoursesListByUsers,
  searchCourses
} = require('../services/courses');

const controller = {
  getAllCourses: () => getAllCourses(knex),
  getCoursesListByUsers: (req) => getCoursesListByUsers(knex, req),
  searchCourses: (req) => searchCourses(knex, req)
};

module.exports = controller;
