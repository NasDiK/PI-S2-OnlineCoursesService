const {logger} = require('../../core');
const deleteUserById = async(knex, req) => {
  try {
    const {targetUserId} = req.body;

    await knex('tasks_logger')
      .where('user_id', targetUserId)
      .orWhere('createdBy', targetUserId)
      .del();

    await knex('logger')
      .where('createdBy', targetUserId)
      .del();

    await knex('users_roles')
      .where('user_id', targetUserId)
      .del();

    await knex('groups_users')
      .where('user_id', targetUserId)
      .del();

    await knex('users')
      .where('id', targetUserId)
      .del();

    return {message: 'Ok'};
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  deleteUserById
};