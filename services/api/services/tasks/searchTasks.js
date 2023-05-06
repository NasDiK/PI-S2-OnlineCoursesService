/**
* @typedef {{
* tasksIds: number
* fields: string[]
* coursesIds: number
* parentId: number //на будущее
* appends: [string, string, string, string][]
* }} requestParams
*/

/**
* Возвращает задачи по фильтру
* @param {import('knex').Knex} knex
* @param {requestParams} request
* @returns {object} Задача
*/
const searchTasks = (knex, request) => {
  const {tasksIds, fields, coursesIds, appends} = request.body;

  const model = knex('tasks')
    .select(fields || 'id');

  if (tasksIds) {
    model.whereIn('id', tasksIds);
  }

  if (coursesIds) {
    model.whereIn('course_id', coursesIds);
  }

  appends.forEach((append) => {
    const [tableToJoin, fieldToJoin, withJoin, withFieldJoin] = append;

    model
      .leftJoin(tableToJoin, `${tableToJoin}.${fieldToJoin}`, '=', `${withJoin}.${withFieldJoin}`);
  });

  return model;
};

module.exports = searchTasks;