const {logger} = require('../../core');
const getGroupsById = (knex, req) => {
  try {
    const {groupId} = req.body;

    if (groupId === undefined) {
      return;
    }

    return knex('groups')
      .select('id', 'title', 'course_id')
      .where('id', groupId);
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getGroupsById
};