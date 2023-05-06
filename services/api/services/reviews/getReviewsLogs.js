const {tasks: {action}} = require('@local/enums');

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
    orders,
    filter: {
      userIds,
      tasksIds,
      createdAt,
      createdBy
    } = {}
  } = req.body;
  const _model = knex('tasks_logger').select(fields);

  _model.whereIn('action', [
    action.SEND_TO_REVIEW,
    action.REVIEW_APPROVE,
    action.REVIEW_FAIL,
    action.SEND
  ]);

  if (appends.length) {
    appends.forEach((_append) => {

      switch (_append) {
        case 'tasks':
          _model.leftJoin('tasks', function() {
            this.on('task_id', '=', 'tasks.id');
          });
          break;
        case 'users':
          _model.leftJoin('users', function() {
            this.on('user_id', '=', 'users.id');
          });
          break;
      }
    });
  }

  _model.leftJoin('groups_users', function() {
    this.on('tasks_logger.user_id', '=', 'groups_users.user_id');
  });

  _model.leftJoin('groups', function() {
    this.on('groups_users.group_id', '=', 'groups.id');
  });

  if (userIds) {
    _model.whereIn('user_id', userIds);
  }

  if (tasksIds) {
    _model.whereIn('task_id', tasksIds);
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

  if (Array.isArray(orders)) { //['column', 'asc'][]
    orders.forEach((order) => {
      _model.orderBy(order[0], order[1]);
    });
  }

  return _model;
};