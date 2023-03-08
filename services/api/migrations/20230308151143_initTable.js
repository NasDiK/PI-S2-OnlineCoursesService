/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('nickname').comment('Логин пользователя')
      .notNullable();
    table.string('avatar_url ').comment('Ссылка на аватарку');
    table.string('fullname').comment('Полное имя пользователя');
    table.string('password').comment('Пароль пользователя')
      .notNullable();
  });
  await knex.schema.createTable('courses', (table) => {
    table.increments('id');
    table.string('title').comment('Заголовок курса')
      .notNullable();
    table.string('description').comment('Описание курса');
  });
  await knex.schema.createTable('groups', (table) => {
    table.increments('id');
    table.string('title').comment('Заголовок группы')
      .notNullable();
    table.integer('course_id');
    table.foreign('course_id').references('id')
      .inTable('courses');
  });
  await knex.schema.createTable('groups_users', (table) => {
    table.increments('id');
    table.integer('group_id');
    table.integer('user_id');
    table.foreign('group_id').references('id')
      .inTable('groups');
    table.foreign('user_id').references('id')
      .inTable('users');
    table.boolean('isModerator').defaultTo(false)
      .notNullable();
  });
  await knex.schema.createTable('roles', (table) => {
    table.increments('id');
    table.string('title').comment('Заголовок роли')
      .notNullable();
    table.string('name').comment('Название роли');
  });
  await knex.schema.createTable('users_roles', (table) => {
    table.increments('id');
    table.integer('user_id');
    table.integer('role_id');
    table.foreign('user_id').references('id')
      .inTable('users');
    table.foreign('role_id').references('id')
      .inTable('roles');
  });
  await knex.schema.createTable('rights', (table) => {
    table.increments('id');
    table.integer('role_id');
    table.foreign('role_id').references('id')
      .inTable('roles');
    table.integer('service_id').notNullable()
      .comment('From enums');
    table.integer('rights').notNullable()
      .comment('Сумма прав');
  });
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.integer('course_id');
    table.foreign('course_id').references('id')
      .inTable('courses');
    table.string('title').comment('Заголовок задачи')
      .notNullable();
    table.string('description').comment('Описание задачи');
    table.text('value').comment('Содержание задачи');
    table.integer('type').notNullable()
      .comment('From enums');
    table.integer('max_note').comment('Максимальная оценка');
    table.integer('weight').comment('Порядок относительно курса');
  });
  await knex.schema.createTable('tasks_logger', (table) => {
    table.increments('id');
    table.integer('user_id');
    table.integer('task_id');
    table.foreign('user_id').references('id')
      .inTable('users');
    table.foreign('task_id').references('id')
      .inTable('tasks');
    table.timestamp('createdAt');
    table.text('value').comment('Решение задачи');
    table.integer('action').comment('Решение задачи')
      .notNullable();
  });
  await knex.schema.createTable('logger', (table) => {
    table.increments('id');
    table.integer('log_type').notNullable();
    table.integer('service_id').notNullable();
    table.text('message').comment('Сообщение');
    table.timestamp('createdAt');
    table.integer('createdBy');
    table.foreign('createdBy').references('id')
      .inTable('users');
  });

  return Promise.resolve();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('courses');
  await knex.schema.dropTable('groups');
  await knex.schema.dropTable('groups_users');
  await knex.schema.dropTable('roles');
  await knex.schema.dropTable('users_roles');
  await knex.schema.dropTable('rights');
  await knex.schema.dropTable('tasks');
  await knex.schema.dropTable('tasks_logger');
  await knex.schema.dropTable('logger');

  return Promise.resolve();
};
