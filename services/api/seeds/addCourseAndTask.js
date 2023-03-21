/* eslint-disable id-denylist */
/* eslint-disable camelcase */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del();
  await knex('courses').del();

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
      type: 2, //SINGLE_ANSWER
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
      type: 1, //RADIO
      max_note: null,
      weight: null,
      correctAnswer: '[3]'
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
      type: 3, //MULTI_ANSWER
      max_note: null,
      weight: null,
      correctAnswer: '[1,3]'
    }
  ]);
};
