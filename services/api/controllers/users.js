const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getUsersByRoleName
} = require('../services/users');

const controller = {
  getUsersByRoleName: (req) => getUsersByRoleName(knex, req)
};

module.exports = controller;