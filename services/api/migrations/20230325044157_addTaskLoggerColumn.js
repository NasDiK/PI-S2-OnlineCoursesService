/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.alterTable('tasks_logger', (table) => {
  table.integer('note').comment('Оценка за задачу');
});
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.alterTable('tasks_logger', (table) => {
  table.dropColumn('note');
});
