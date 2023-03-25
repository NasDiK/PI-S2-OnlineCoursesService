/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => Promise.all([
  knex.schema.alterTable('tasks_logger', (_table) => {
    _table.timestamp('createdAt').defaultTo(knex.fn.now())
      .alter();
  }),
  knex.schema.alterTable('logger', (_table) => {
    _table.timestamp('createdAt').defaultTo(knex.fn.now())
      .alter();
  })
]);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => Promise.all([
  knex.schema.alterTable('tasks_logger', (_table) => {
    _table.timestamp('createdAt').defaultTo(null)
      .alter();
  }),
  knex.schema.alterTable('logger', (_table) => {
    _table.timestamp('createdAt').defaultTo(null)
      .alter();
  })
]);
