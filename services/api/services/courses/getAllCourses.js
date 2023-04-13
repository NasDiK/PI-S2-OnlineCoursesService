const {logger} = require('../../core');
const getAllCourses = async(knex) => {
  try {
    return await knex('courses').select('id', 'title', 'description');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {getAllCourses};