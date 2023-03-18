/**
 * Возвращает поля задачи по id
 * @param {import('knex').Knex} knex
 * @param {{
 *  taskId: number
 *  fields: string[]
 * }} request
 * @returns {object} Задача
 */
const getTaskById = (knex, request) => {
  const {taskId, fields} = request.body;

  const model = knex('tasks')
    .select(fields || 'id')
    .where('id', taskId);

  return model;
};

module.exports = getTaskById;