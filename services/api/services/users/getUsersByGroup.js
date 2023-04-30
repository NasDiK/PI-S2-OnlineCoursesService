const {logger} = require('../../core');
const getUsersByGroup = async(knex, req) => {
  try {
    const {groupId} = req.body;

    const usersIds = await knex('groups_users')
      .where('group_id', groupId)
      .pluck('user_id');

    const studentRoleId = await knex('roles')
      .where('name', 'student')
      .pluck('id');

    const studentsIds = await knex('users_roles')
      .whereIn('role_id', studentRoleId)
      .whereIn('user_id', usersIds)
      .pluck('user_id');

    return knex('users')
      .whereIn('id', studentsIds)
      .select('fullname', 'id');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getUsersByGroup
};