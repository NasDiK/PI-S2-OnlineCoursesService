const {tasks: {fieldType: taskTypeEnum}} = require('@local/enums');

/* eslint-disable id-denylist */
/* eslint-disable camelcase */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('tasks_logger').del();
  await knex('logger').del();
  await knex('users_roles').del();
  await knex('roles').del();
  await knex('users').del();
  await knex('tasks').del();
  await knex('courses').del();
  await knex('groups_users').del();
  await knex('groups').del();
  await knex('rights').del();

  let _users = await knex('users').insert([
    {nickname: 'admin',
      password: '$2b$07$w5c5blGFTYKklBAjNdOO/O9SfRsLAxP1Qfe5iJBuqkQlA7L21bVEK'}, //admin
    {nickname: 'teacher',
      password: '$2b$07$vpLNIZJOPUKkcn4VTzxVBOKKCqfMJ8eUPVCxbGfGyHaZ6hkvA8RmW'}, //teacher
    {nickname: 'student',
      password: '$2b$07$3AmObFxyAFaUerwclCEzOOFEur931k6t78v4Qh3oSlbxvgA6YnWUy'} //student
  ])
    .returning('id');

  _users = _users.map(({id}) => id);

  let _roles = await knex('roles').insert([
    {name: 'admin', title: 'Администратор'},
    {name: 'teacher', title: 'Учитель'},
    {name: 'student', title: 'Студент'}
  ])
    .returning('id');

  _roles = _roles.map(({id}) => id);

  await knex('users_roles').insert([
    {user_id: _users[0], role_id: _roles[0]},
    {user_id: _users[1], role_id: _roles[1]},
    {user_id: _users[2], role_id: _roles[2]}
  ]);

  await knex('courses').insert([
    {title: 'Тестовый курс #1', description: 'Проверяем работу себя'}
  ]);

  const {id: courseId} = await knex('courses').first('id');

  await knex('tasks').insert([
    {
      course_id: courseId,
      title: 'Загадки',
      description: 'Весит груша, нельзя скушать',
      value: null,
      type: taskTypeEnum.SINGLE_ANSWER,
      max_note: 8,
      weight: null,
      correctAnswer: 'Лампочка'
    },
    {
      course_id: courseId,
      title: 'Винни-пух',
      description: 'Что тяжелее? Килограмм перьев или килограмм гвоздей',
      value: `[
        {"value":1, "label": "Перьи"},
        {"value":2, "label": "Гвозди"},
        {"value":3, "label": "Одинаково"}
      ]`,
      type: taskTypeEnum.RADIO,
      max_note: null,
      weight: null,
      correctAnswer: '3'
    },
    {
      course_id: courseId,
      title: 'Исторический вопросик',
      description: 'Кто был президентом России?',
      value: `[
        {"value":1, "label": "Путин"},
        {"value":2, "label": "Галкин"},
        {"value":3, "label": "Железный димон"}
      ]`,
      type: taskTypeEnum.MULTI_ANSWER,
      max_note: null,
      weight: null,
      correctAnswer: '[1,3]'
    },
    {
      course_id: courseId,
      title: 'Hello world JS Practice',
      description: `Напиши Hello world на JS. Сможешь ли??

      Или всё-таки слабак??`,
      value: `function Kek{
//TODO task
}

Kek();`,
      type: taskTypeEnum.TEXT_AREA,
      max_note: null,
      weight: null
    }
  ]);

  const [{id: groupId}] = await knex('groups').insert({
    'course_id': courseId,
    title: 'Огурцы'
  })
    .returning('id');

  await knex('groups_users').insert([
    {
      'user_id': _users[1], //teacher
      'group_id': groupId,
      'isModerator': true
    },
    {
      'user_id': _users[2], //student
      'group_id': groupId
    }
  ]);
};
