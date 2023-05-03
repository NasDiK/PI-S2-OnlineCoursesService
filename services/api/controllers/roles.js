const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getRolesByName,
  getRoles
} = require('../services/roles');

const controller = {
  getRolesByName: (request) => getRolesByName(knex, request),
  getRoles: () => getRoles(knex)
};

module.exports = controller;
