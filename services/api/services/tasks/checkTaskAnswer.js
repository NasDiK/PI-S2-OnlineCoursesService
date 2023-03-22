// const {tasks: tasksEnum} = require('@local/enums');
const {isEqualArrays} = require('../../utils');

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

  let correctAnswer;

  try {
    switch (currentTask.type) {
      case 1: //tasksEnum.fieldType.MULTI_ANSWER
        correctAnswer = JSON.parse(currentTask.correctAnswer);

        return isEqualArrays(correctAnswer, answer, true);

      case 2: //tasksEnum.fieldType.SINGLE_ANSWER
      case 3: //tasksEnum.fieldType.RADIO
        return currentTask.correctAnswer === answer.toString();
      default:
        throw new Error('Unexpected autocheck task type');
    }
  } catch(_) {
    return false;
  }
};

module.exports = checkTaskAnswer;