const {
  tasks: {
    fieldType: tasksEnum,
    action: taskActionEnum
  },
  shared: {status: statusEnum}
} = require('@local/enums');
const {isEqualArrays} = require('../../utils');
const {logger, generateError} = require('../../core');
const writeTaskLog = require('./writeTaskLog');

const _getTaskStatusByResult = (result) => {
  if (result === true) {
    return statusEnum.SUCCESS;
  } else if (result === false) {
    return statusEnum.INCORRECT;
  }

  return null;
};

/**
 * Проверяет ответ к заданию (доступно только для авто-типов)
 * @param {import('knex').Knex} knex
 * @param {{
 *  taskId: number
 *  answer: any
 * }} request
 * @returns {object} Задача
 */
const checkTaskAnswer = async(knex, request) => {
  const {taskId, answer} = request.body;

  const [currentTask] = await knex('tasks')
    .select('id', 'correctAnswer', 'type')
    .where('id', taskId);

  if (!currentTask) {
    throw new Error(`task #${taskId} doesn't exist`);
  }

  let correctAnswer, result;

  try {
    switch (currentTask.type) {
      case tasksEnum.MULTI_ANSWER:
        correctAnswer = JSON.parse(currentTask.correctAnswer);
        try {
          result = isEqualArrays(correctAnswer, answer, true);
        } catch(_) {
          result = false;
        }

        await writeTaskLog(knex, request, currentTask.id, {
          action: taskActionEnum.SEND,
          'value': JSON.stringify(answer),
          status: _getTaskStatusByResult(result),
          userId: request.body.userId
        });

        return result;
      case tasksEnum.SINGLE_ANSWER:
      case tasksEnum.RADIO:
        result = currentTask.correctAnswer === answer.toString();

        await writeTaskLog(knex, request, currentTask.id, {
          action: taskActionEnum.SEND,
          'value': answer,
          status: _getTaskStatusByResult(result),
          userId: request.body.userId
        });

        return result;
      case tasksEnum.TEXT_AREA:
        await writeTaskLog(knex, request, currentTask.id, {
          action: taskActionEnum.SEND_TO_REVIEW,
          'value': answer,
          userId: request.body.userId
        });

        return true;
      default:
        throw generateError('Unexpected autocheck task type', {answer, taskType: currentTask.type});
    }
  } catch(err) {
    logger.error(err);

    return false;
  }
};

module.exports = checkTaskAnswer;