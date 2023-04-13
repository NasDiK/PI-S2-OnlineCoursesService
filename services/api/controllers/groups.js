const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getGroups,
  getUsersInGroup,
  createGroup,
  saveGroupChanges
} = require('../services/groups');

const controller = {
  getGroups: () => getGroups(knex),
  getUsersInGroup: (req) => getUsersInGroup(knex, req),
  createGroup: (req) => createGroup(knex, req),
  saveGroupChanges: (req) => saveGroupChanges(knex, req)
};

module.exports = controller;