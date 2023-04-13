const {logger} = require('../../core');
const getUsersInGroup = async(knex, req) => {
  try {
    const {groupId} = req.body;

    return await knex('groups_users')
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