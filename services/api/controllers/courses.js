const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const controller = {
  async getCoursesList(req, res) {
    try {
      const {usersIds} = req.body;

      const groupsIds = await knex('users')
        .leftJoin('groups_users', 'users.id', '=', 'groups_users.user_id')
        .whereIn('users.id', usersIds)
        .select('group_id');

      const coursesIds = await knex('groups_users')
        .leftJoin('groups', 'groups_users.group_id', '=', 'groups.id')
        .whereIn('groups_users.group_id', groupsIds.map((x) => x.group_id))
        .select('course_id');

      const courses = await knex('courses')
        .whereIn('id', coursesIds.map((x) => x.course_id))
        .select('id', 'title', 'description');

      return res.status(200).json({courses});
    } catch(exception) {
      res.status(400).json({message: exception});
    }
  },

  async searchCourses(req, res) {
    try {
      const courses = await knex('courses').select('id', 'title', 'description');

      return res.status(200).json({courses});
    } catch(exception) {
      res.status(400).json({message: exception});
    }
  }
};

module.exports = controller;
