const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getUsersByRoleName,
  getUsersByGroup
} = require('../services/users');

const controller = {
  getUsersByRoleName: (req) => getUsersByRoleName(knex, req),
  getUsersByGroup: (req) => getUsersByGroup(knex, req)
};

module.exports = controller;