/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable camelcase */
/* eslint-disable id-denylist */
const {logger} = require('../../core');
const {groupBy, coupleBy} = require('../../utils');

const extractProp = (array, key) => array.map((el) => el[key]);

/**
 * @param {import('knex').Knex} knex
 */
const editCourse = async(knex, req) => {
  const {courseData} = req.body;
  const {title, description, tasks, id} = courseData || {};
  const additionalInformation = {};

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

    //Перенос логов
    const existTasksIds = await knex('tasks')
      .where({'course_id': id})
      .pluck('id');
    const logOnExistTasks = await knex('tasks_logger')
      .select('*')
      .whereIn('task_id', existTasksIds);

    const logTasksMap = groupBy(logOnExistTasks, 'task_id');
    const newTasksSelectorIds = tasks.map(({selectorTaskId}) => selectorTaskId);
    const logsToInsert = newTasksSelectorIds.reduce((acc, newTaskId, idx) => {
      const taskLogs = logTasksMap[newTaskId];

      if (taskLogs) {
        acc.push({insertedIdx: idx, taskLogs});
      }

      return acc;
    }, []);
    const coupledLogsToInsertByCreatedIdx = coupleBy(logsToInsert, 'insertedIdx', 'taskLogs');

    await knex('tasks_logger')
      .whereIn('task_id', existTasksIds)
      .del();

    await knex('tasks')
      .where('course_id', id)
      .del();

    tasks.forEach((task) => {
      delete task.selectorTaskId;
    });

    const _createdTasksIds = extractProp(await knex('tasks')
      .insert(tasks)
      .returning('id'), 'id');

    if (logsToInsert.length) {
      const _preparedToInsertLogs = _createdTasksIds.reduce((acc, taskId, index) => {
        const thisIdxLogs = coupledLogsToInsertByCreatedIdx[index];

        if (thisIdxLogs) {
          acc.push(...thisIdxLogs.map((log) => {
            return {
              ...log,
              task_id: taskId
            };
          }));
        }

        return acc;
      }, []);

      _preparedToInsertLogs.forEach((log) => {
        delete log.id;
      });

      additionalInformation.insertedLogs = extractProp(await knex('tasks_logger')
        .insert(_preparedToInsertLogs)
        .returning('id'), 'id');
    }

    return {
      ..._updatedCourse,
      tasks: _createdTasksIds,
      ...additionalInformation
    };
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = {editCourse};