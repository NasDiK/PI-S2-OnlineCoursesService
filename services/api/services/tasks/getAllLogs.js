const {logger} = require('../../core');
const {tasks: {action}} = require('@local/enums/');
const getAnswersLogs = (knex) => {
  try {
    return knex('tasks_logger')
      .whereIn('action', [action.SEND, action.REVIEW_APPROVE])
      .select('value', 'action', 'tasks_logger.user_id', 'status');
  } catch(exception) {
    logger.error(exception);

    return exception;
  }
};

module.exports = getAnswersLogs;