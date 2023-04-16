const {tasks: {
  fieldType: tasksEnum,
  action: taskActionEnum
}} = require('@local/enums');
const {isEqualArrays} = require('../../utils');
const {logger, generateError} = require('../../core');
const writeTaskLog = require('./writeTaskLog');

/**
   * Проверяет ответ к заданию (доступно только для авто-типов)
   * @param {import('knex').Knex} knex
   * @param {{
   *  taskId: number
   *  answer: any
   * }} request
   * @returns {object} Задача
   */
const confirmReview = async(knex, request) => {
  const {taskId, answer, userId} = request.body;

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
          'value': result,
          userId
        });

        return result;
      case tasksEnum.SINGLE_ANSWER:
      case tasksEnum.RADIO:
        result = currentTask.correctAnswer === answer.toString();

        await writeTaskLog(knex, request, currentTask.id, {
          action: taskActionEnum.SEND,
          'value': result,
          userId
        });

        return result;
      case tasksEnum.TEXT_AREA:
        await writeTaskLog(knex, request, currentTask.id, {
          action: taskActionEnum.SEND_TO_REVIEW,
          'value': answer,
          userId
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

module.exports = confirmReview;