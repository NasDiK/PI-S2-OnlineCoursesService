const {logger} = require('../../core');
const getUsersByRoleName = async(knex, req) => {
  try {
    const {roleName} = req.body;

    const roleId = await knex('roles')
      .whereIn('name', roleName)
      .pluck('id');

    return knex('users')
      .leftJoin('users_roles', 'users.id', '=', 'users_roles.user_id')
      .whereIn('role_id', roleId)
      .select('users.id', 'users.nickname', 'users.fullname', 'role_id');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getUsersByRoleName
};