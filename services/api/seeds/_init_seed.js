/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
const {tasks: {fieldType: taskTypeEnum}} = require('@local/enums');
const bcrypt = require('bcrypt');

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
      fullname: 'Шапцев Валерий Алексеевич',
      password: bcrypt.hashSync('admin', 7)},
    {nickname: 'teacher',
      fullname: 'Куликова София Тимофеевна',
      password: bcrypt.hashSync('teacher', 7)},
    {nickname: 'PavlovRoman',
      fullname: 'Павлов Роман Евгеньевич',
      password: bcrypt.hashSync('student', 7)},
    {nickname: 'SmirnovMax',
      fullname: 'Смирнов Максим Маркович',
      password: bcrypt.hashSync('student', 7)},
    {nickname: 'BedrinSemyon',
      fullname: 'Бедрин Семён Олегович',
      password: bcrypt.hashSync('student', 7)},
    {nickname: 'TungusovAlexander',
      fullname: 'Тунгусов Александр Сергеевич',
      password: bcrypt.hashSync('student', 7)}
  ])
    .returning('*');

  console.log(_users.map(({nickname, fullname}) => {
    return {nickname, fullname};
  }));
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
    {user_id: _users[0], role_id: _roles[0]}, //админ
    {user_id: _users[1], role_id: _roles[1]}, //учитель
    {user_id: _users[2], role_id: _roles[2]}, //студент
    {user_id: _users[3], role_id: _roles[2]}, //студент
    {user_id: _users[4], role_id: _roles[2]}, //студент
    {user_id: _users[5], role_id: _roles[2]} //студент
  ])
    .returning('*');

  console.log('\nInserted roles_users relations:', _relations_users_roles);

  const _courses = await knex('courses').insert([
    {title: 'Тестовый курс #1',
      description: 'Содержит 4 задачи с разными видами ответов, разработан Тунуговым А.С.'},
    {title: 'Тестовый курс #2',
      description: 'Уникальный курс имени Семёна Бедрина'}
  ])
    .returning('*');

  console.log('\nInserted courses:', _courses);

  const courseId = _courses[0].id; //helper
  const courseId2 = _courses[1].id; //helper курс2

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
    },
    {
      course_id: courseId2,
      title: 'Загадки',
      description: 'Тяги, которые покорили весь мир',
      value: null,
      type: taskTypeEnum.SINGLE_ANSWER,
      max_note: null,
      weight: null,
      correctAnswer: 'Бархатные'
    }
  ])
    .returning('*');

  console.log('\nInserted tasks:', _tasks);

  const _groups = await knex('groups').insert([{
    'course_id': courseId,
    title: 'ПИ.20'
  },
  {
    'course_id': _courses[1].id,
    title: 'ПИ.20.01-1'
  }])
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
    },
    {
      'user_id': _users[3], //student
      'group_id': groupId
    },
    {
      'user_id': _users[4], //student
      'group_id': groupId
    },
    {
      'user_id': _users[5], //student
      'group_id': groupId
    },
    {
      'user_id': _users[4], //student
      'group_id': _groups[1].id
    },
    {
      'user_id': _users[5], //student
      'group_id': _groups[1].id
    }
  ])
    .returning('*');

  console.log('\nInserted relations groups_users:', _relations_groups_users);
  //_users[2-5]

  const _logs = await knex('tasks_logger').insert([
    {
      user_id: _users[2],
      task_id: _tasks[0].id,
      createdBy: _users[2],
      action: 1,
      note: 5,
      value: true
    },
    {
      user_id: _users[2],
      task_id: _tasks[1].id,
      createdBy: _users[2],
      action: 1,
      note: null,
      value: false
    },
    {
      user_id: _users[2],
      task_id: _tasks[2].id,
      createdBy: _users[2],
      action: 1,
      note: null,
      value: false
    },
    {
      user_id: _users[2],
      task_id: _tasks[3].id,
      createdBy: _users[2],
      action: 2,
      note: null,
      value: 'function Kek{\n' +
        '//TODO task\n' +
        '}sdgfsg\n' +
        '\n' +
        'Kek();'
    },
    {
      user_id: _users[3],
      task_id: _tasks[0].id,
      createdBy: _users[3],
      action: 1,
      note: 5,
      value: true
    },
    {
      user_id: _users[3],
      task_id: _tasks[1].id,
      createdBy: _users[3],
      action: 1,
      note: 10,
      value: true
    },
    {
      user_id: _users[3],
      task_id: _tasks[2].id,
      createdBy: _users[3],
      action: 1,
      note: 8,
      value: true
    },
    {
      user_id: _users[3],
      task_id: _tasks[3].id,
      createdBy: _users[3],
      action: 3,
      note: null,
      value: 'function Kek{\n' +
        '//TODO task\n' +
        '}Console.log()\n' +
        '\n' +
        'Kek();'
    },
    {
      user_id: _users[4],
      task_id: _tasks[1].id,
      createdBy: _users[4],
      action: 1,
      note: 10,
      value: true
    },
    {
      user_id: _users[4],
      task_id: _tasks[2].id,
      createdBy: _users[4],
      action: 1,
      note: null,
      value: false
    },
    {
      user_id: _users[4],
      task_id: _tasks[3].id,
      createdBy: _users[4],
      action: 4,
      note: null,
      value: 'function Kek{\n' +
        '//TODO task\n' +
        '}Console.log(HELLO)\n' +
        '\n' +
        'Kek();'
    },
    {
      user_id: _users[5],
      task_id: _tasks[0].id,
      createdBy: _users[5],
      action: 1,
      note: 5,
      value: true
    },
    {
      user_id: _users[5],
      task_id: _tasks[1].id,
      createdBy: _users[5],
      action: 1,
      note: null,
      value: false
    },
    {
      user_id: _users[5],
      task_id: _tasks[2].id,
      createdBy: _users[5],
      action: 1,
      note: 8,
      value: true
    },
    {
      user_id: _users[5],
      task_id: _tasks[3].id,
      createdBy: _users[5],
      action: 3,
      note: null,
      value: 'function Kek{\n' +
        '//TODO task\n' +
        '}Console.log(HELLO)\n' +
        '\n' +
        'Kek();'
    },
    {
      user_id: _users[4],
      task_id: _tasks[4].id,
      createdBy: _users[4],
      action: 1,
      note: 777,
      value: true
    }
  ])
    .returning('*');

  console.log('\nInserted logs:', _logs);
};
