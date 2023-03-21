/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('users').del();
  await knex('users').insert([
    {nickname: 'admin',
      password: '$2b$07$w5c5blGFTYKklBAjNdOO/O9SfRsLAxP1Qfe5iJBuqkQlA7L21bVEK'}, //admin
    {nickname: 'teacher',
      password: '$2b$07$vpLNIZJOPUKkcn4VTzxVBOKKCqfMJ8eUPVCxbGfGyHaZ6hkvA8RmW'}, //teacher
    {nickname: 'student',
      password: '$2b$07$3AmObFxyAFaUerwclCEzOOFEur931k6t78v4Qh3oSlbxvgA6YnWUy'} //student
  ]);
  await knex('roles').del();
  await knex('roles').insert([
    {name: 'admin'},
    {name: 'teacher'},
    {name: 'student'}
  ]);
  await knex('users_roles').del();
  await knex('users_roles').insert([
    // eslint-disable-next-line camelcase
    {user_id: 1, role_id: 1},
    // eslint-disable-next-line camelcase
    {user_id: 2, role_id: 2},
    // eslint-disable-next-line camelcase
    {user_id: 3, role_id: 3}
  ]);
};
