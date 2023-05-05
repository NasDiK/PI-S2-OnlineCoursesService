/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
/* eslint-disable id-denylist */
const {logger} = require('../../core');

/**
 * @param {import('knex').Knex} knex
 */
const editCourse = async(knex, req) => {
  const {courseData} = req.body;
  const {title, description, tasks, id} = courseData || {};

  if ([tasks].includes(undefined)) {
    return;
  }

  try {
    const _courseModel = knex('courses')
      .where({id});

    // title && _courseModel.update({title});
    description && _courseModel.update({description}).returning('description');

    if (!title && !description) {
      _courseModel.select('title', 'description');
    }

    const [_updatedCourse] = await _courseModel;

    tasks.forEach((task) => {
      if (Array.isArray(task.correctAnswer)) {
        task.correctAnswer = JSON.stringify(task.correctAnswer);
      }

      if (Array.isArray(task.value)) {
        task.value = JSON.stringify(task.value);
      }
      task.course_id = id;
    });

    await knex('tasks')
      .where({'course_id': id})
      .del();

    const _createdTasksIds = await knex('tasks')
      .insert(tasks)
      .returning('id');

    return {
      ..._updatedCourse,
      tasks: _createdTasksIds
    };
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {editCourse};