/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
  await knex.schema.alterTable('roles', (table) => {
    table.string('title').comment('Заголовок роли')
      .alter();
    table.string('name').comment('Название роли')
      .notNullable()
      .alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
  await knex.schema.alterTable('roles', (table) => {
    table.string('title').comment('Заголовок роли')
      .notNullable()
      .alter();
    table.string('name').comment('Название роли')
      .alter();
  });
};
