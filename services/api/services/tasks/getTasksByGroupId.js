const getTasksByGroupId = (knex, request) => {
  const {groupId} = request.body;

  const courseId = knex('groups')
    .select('course_id')
    .where('id', groupId);

  return knex('tasks')
    .select('title')
    .where('course_id', courseId);
};

module.exports = getTasksByGroupId;