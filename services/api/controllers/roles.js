const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getAllRoles,
  setUsersRoles
} = require('../services/roles');

const controller = {
  getAllRoles: () => getAllRoles(knex),
  setUsersRoles: (request) => setUsersRoles(knex, request)
};

module.exports = controller;
