const {shared: {status}} = require('@local/enums');
const {tasks: {action}} = require('@local/enums');

const getUpdateStatusColumnPromise = (knex, conditions, toUpdateStatus) => {
  const _model = knex('tasks_logger');

  conditions.forEach((_cond) => {
    _model.where(_cond.field, _cond.op, _cond.val);
  });

  _model.update({
    status: toUpdateStatus
  });

  return _model;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
  await knex.schema.alterTable('tasks_logger', (table) => {
    table.integer('status').comment('enum://shared/status');
  });

  const promises = [];

  promises.push(getUpdateStatusColumnPromise(knex, [
    {
      field: 'action',
      op: '=',
      val: action.SEND
    }, {
      field: 'value',
      op: '=',
      val: 'true'
    }
  ], status.SUCCESS));

  promises.push(getUpdateStatusColumnPromise(knex, [
    {
      field: 'action',
      op: '=',
      val: action.SEND
    }, {
      field: 'value',
      op: '=',
      val: 'false'
    }
  ], status.INCORRECT));

  return Promise.all(promises);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.alterTable('tasks_logger', (table) => {
  table.dropColumn('status');
});

