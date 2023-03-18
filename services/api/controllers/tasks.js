const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getTaskById
} = require('../services/tasks');

const controller = {
  getTaskById: (request) => getTaskById(knex, request)
};

module.exports = controller;
