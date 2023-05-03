const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getRolesByName,
  getRoles,
  setNewRole
} = require('../services/roles');

const controller = {
  getRolesByName: (request) => getRolesByName(knex, request),
  getRoles: () => getRoles(knex),
  setNewRole: (request) => setNewRole(knex, request)
};

module.exports = controller;
