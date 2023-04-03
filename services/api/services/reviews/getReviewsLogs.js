/**
 * @typedef {{
 *  fields: string[]
 *  appends: string[],
 *  filter: {
 *   userId: number;
 *   taskId: number;
 *   createdAt: string;
 *   createdBy: number;
 * }
 * }} BodyParams
 */

/**
 * @param {import('knex').Knex} knex
 * @param {import('express').Request} req
 */
module.exports = (knex, req) => {
  /**
   * @type {BodyParams}
   */
  const {
    fields = ['tasks_logger.id'],
    appends = [],
    filter: {
      userId,
      taskId,
      createdAt,
      createdBy
    } = {}
  } = req.body;
  const _model = knex('tasks_logger').select(fields);

  if (appends.length) {
    appends.forEach((_append) => {

      switch (_append) {
        case 'tasks':
          _model.leftJoin('tasks', function() {
            this.on('task_id', '=', 'tasks.id');
          });
          break;
      }
    });
  }

  if (userId) {
    _model.where('user_id', userId);
  }

  if (taskId) {
    _model.where('task_id', taskId);
  }

  if (Array.isArray(createdAt)) {
    const [_after, _before] = createdAt;

    _model.where((builder) => {
      if (_after) {
        builder.where(createdAt, '>=', _after);
      }

      if (_before) {
        builder.andWhere(createdAt, '<=', _before);
      }
    });
  }

  if (createdBy) {
    _model.where(createdBy);
  }

  return _model;
};