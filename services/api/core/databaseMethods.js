const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const getUserPermissions = (userId) => knex('users_roles')
  .where('user_id', userId)
  .pluck('role_id');

/**
 * @param {string[]} nameArray
 */
const getRolesIds = (nameArray) => {
  const _model = knex('roles').select('id', 'name');

  nameArray && _model.whereIn('name', nameArray);

  return _model;
};

module.exports = {
  getUserPermissions,
  getRolesIds
};