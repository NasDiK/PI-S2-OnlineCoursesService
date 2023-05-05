const {logger} = require('../../core');

/**
 * @param {import('knex').Knex} knex
 */
const createCourse = async(knex, req) => {
  const {courseData} = req.body;
  const {title, description, tasks} = courseData || {};

  if ([title, description, tasks].includes(undefined)) {
    return;
  }

  try {
    const [{id: _createdCourseId}] = await knex('courses')
      .insert({title, description})
      .returning('id');

    const _createdTasksIds = await knex('tasks')
      .insert(tasks)
      .returning('id');

    return {
      id: _createdCourseId,
      tasks: _createdTasksIds
    };
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {createCourse};