/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const {tasks: {fieldType: taskTypeEnum}} = require('@local/enums');

/* eslint-disable id-denylist */
/* eslint-disable camelcase */

const deleteTables = async(knex, tableNames) => {
  for (const _name of tableNames) {
    await knex(_name).del();
    console.log(`Deleted table ${_name}`);
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await deleteTables(knex, [
    'tasks_logger',
    'logger',
    'users_roles',
    'roles',
    'tasks',
    'groups_users',
    'groups',
    'courses',
    'rights',
    'users'
  ]);

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
    .returning('*');

  console.log('\nInserted roles:', _roles);

  _roles = _roles.map(({id}) => id);

  const _relations_users_roles = await knex('users_roles').insert([
    {user_id: _users[0], role_id: _roles[0]},
    {user_id: _users[1], role_id: _roles[1]},
    {user_id: _users[2], role_id: _roles[2]}
  ])
    .returning('*');

  console.log('\nInserted roles_users relations:', _relations_users_roles);

  const _courses = await knex('courses').insert([
    {title: 'Тестовый курс #1', description: 'Проверяем работу себя'}
  ])
    .returning('*');

  console.log('\nInserted courses:', _courses);

  const courseId = _courses[0].id; //helper

  const _tasks = await knex('tasks').insert([
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
  ])
    .returning('*');

  console.log('\nInserted tasks:', _tasks);

  const _groups = await knex('groups').insert({
    'course_id': courseId,
    title: 'Огурцы'
  })
    .returning('*');

  console.log('Inserted groups: ', _groups);

  const [{id: groupId}] = _groups; //Helper

  const _relations_groups_users = await knex('groups_users').insert([
    {
      'user_id': _users[1], //teacher
      'group_id': groupId,
      'isModerator': true
    },
    {
      'user_id': _users[2], //student
      'group_id': groupId
    }
  ])
    .returning('*');

  console.log('\nInserted relations groups_users:', _relations_groups_users);
};
