const {logger} = require('../../core');
const setNewRole = async(knex, req) => {
  try {
    const {usersIds, roleId} = req.body;

    if (!roleId || !usersIds) {
      return;
    }
    await knex('users_roles')
      .whereIn('user_id', usersIds)
      .update('role_id', roleId);

    return JSON.stringify('SUCCESS');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  setNewRole
};