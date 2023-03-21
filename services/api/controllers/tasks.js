const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getTaskById,
  searchTasks
} = require('../services/tasks');

const controller = {
  getTaskById: (request) => getTaskById(knex, request),
  searchTasks: (request) => searchTasks(knex, request)
};

module.exports = controller;
