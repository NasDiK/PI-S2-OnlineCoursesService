const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

const getUserPermissions = (userId) => knex('users_roles')
  .where('user_id', userId)
  .select('role_id')
  // eslint-disable-next-line no-shadow
  .then((x) => x.map((x) => x.role_id));

module.exports = {
  getUserPermissions
};