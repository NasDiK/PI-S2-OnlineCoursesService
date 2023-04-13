const {logger} = require('../../core');
const getUsersInGroup = (knex, req) => {
  try {
    const {groupId} = req.body;

    if (groupId === undefined) {
      return;
    }

    return knex('groups_users')
      .select('user_id')
      .where('group_id', groupId);
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getUsersInGroup
};