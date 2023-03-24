/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.alterTable('roles', (table) => {
  table.string('title').comment('Заголовок роли')
    .alter();
  table.string('name').comment('Название роли')
    .notNullable()
    .alter();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.alterTable('roles', (table) => {
  table.string('title').comment('Заголовок роли')
    .notNullable()
    .alter();
  table.string('name').comment('Название роли')
    .alter();
});
