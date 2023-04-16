const {logger} = require('../../core');
const createGroup = async(knex, req) => {
  try {
    const {groupName, courseId} = req.body;

    await knex('groups').insert({
      'title': groupName,
      'course_id': courseId
    });

    return 'Выполнено';
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  createGroup
};