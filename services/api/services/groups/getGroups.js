const {logger} = require('../../core');
const getGroups = (knex) => {
  try {

    return knex('groups').select('id', 'title', 'course_id');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {
  getGroups
};