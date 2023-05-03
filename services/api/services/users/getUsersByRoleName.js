const {logger} = require('../../core');
const getUsersByRoleName = (knex, req) => {
  try {
    const {roleName} = req.body;
    const roleId = knex('roles')
      .where('name', roleName)
      .select('id');

    return knex('users')
      .leftJoin('users_roles', 'users.id', '=', 'users_roles.user_id')
      .where('role_id', roleId)
      .select('users.id', 'users.nickname', 'users.fullname', 'role_id');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getUsersByRoleName
};