const {logger} = require('../../core');
const {tasks: {action}} = require('@local/enums');
const getAnswersLogs = async(knex, req) => {
  try {
    const {groupId} = req.body;

    const courseId = await knex('groups')
      .where('id', groupId)
      .pluck('course_id');

    const tasksIds = await knex('tasks')
      .whereIn('course_id', courseId)
      .pluck('id');

    const answers = knex('tasks_logger')
      .leftJoin('groups_users', 'tasks_logger.user_id', '=', 'groups_users.user_id')
      .whereIn('action', [action.SEND, action.REVIEW_APPROVE])
      .whereIn('task_id', tasksIds)
      .where('groups_users.group_id', groupId)
      .orderBy('tasks_logger.user_id', 'asc')
      .orderBy('tasks_logger.task_id', 'asc')
      .select('value', 'action', 'tasks_logger.user_id', 'task_id', 'note');

    return await answers;
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = getAnswersLogs;