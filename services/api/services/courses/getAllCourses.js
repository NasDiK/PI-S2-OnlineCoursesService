const {logger} = require('../../core');
const getAllCourses = (knex) => {
  try {
    return knex('courses').select('id', 'title', 'description');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {getAllCourses};