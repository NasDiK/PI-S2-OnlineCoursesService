const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getTaskById,
  searchTasks,
  checkTaskAnswer,
  confirmReview
} = require('../services/tasks');

const controller = {
  getTaskById: (request) => getTaskById(knex, request),
  searchTasks: (request) => searchTasks(knex, request),
  checkTaskAnswer: (request) => checkTaskAnswer(knex, request),
  confirmReview: (request) => confirmReview(knex, request)
};

module.exports = controller;
