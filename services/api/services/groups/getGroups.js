const {logger} = require('../../core');
const getGroups = async(knex) => {
  try {

    return await knex('groups').select('id', 'title', 'course_id');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getGroups
};