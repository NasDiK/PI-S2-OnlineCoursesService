const getTasksByGroupId = async(knex, request) => {
  const {groupId} = request.body;

  const courseId = await knex('groups')
    .pluck('course_id')
    .where('id', groupId);

  return knex('tasks')
    .select('title', 'id')
    .whereIn('course_id', courseId);
};

module.exports = getTasksByGroupId;