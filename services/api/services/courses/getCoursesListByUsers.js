const getCoursesListByUsers = async(knex, req) => {
  try {
    const {usersIds} = req.body;

    const groupsIds = await knex('users')
      .leftJoin('groups_users', 'users.id', '=', 'groups_users.user_id')
      .whereIn('users.id', usersIds)
      .pluck('group_id');

    const coursesIds = await knex('groups_users')
      .leftJoin('groups', 'groups_users.group_id', '=', 'groups.id')
      .whereIn('groups_users.group_id', groupsIds)
      .pluck('course_id');

    return await knex('courses')
      .whereIn('id', coursesIds)
      .select('id', 'title', 'description');
  } catch(exception) {
    return exception;
  }
};

module.exports = {
  getCoursesListByUsers
};