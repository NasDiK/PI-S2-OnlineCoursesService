/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.alterTable('tasks_logger', (builder) => {
  builder.integer('createdBy').comment('Кем выполнено действие');
  builder.foreign('createdBy').references('id')
    .inTable('users');
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.alterTable('tasks_logger', (builder) => {
  builder.dropColumn('createdBy');
});
