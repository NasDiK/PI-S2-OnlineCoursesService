const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getUsersByRoleName,
  getUsersByGroup,
  getUsersByIds
} = require('../services/users');

const controller = {
  getUsersByRoleName: (req) => getUsersByRoleName(knex, req),
  getUsersByGroup: (req) => getUsersByGroup(knex, req),
  getUsersByIds: (req) => getUsersByIds(knex, req)
};

module.exports = controller;