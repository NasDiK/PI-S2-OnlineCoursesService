const config = require('../knexfile.js');
const {logger} = require('../core');
const knex = require('knex')(config.development);

const getCoursesList = async(req, res) => {
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

    const courses = await knex('courses')
      .whereIn('id', coursesIds)
      .select('id', 'title', 'description');

    return res.status(200).json({courses});
  } catch(exception) {
    res.status(400).json({message: exception});
  }
};

const searchCourses = async(req, res) => {
  try {
    const courses = await knex('courses').select('id', 'title', 'description');

    return res.status(200).json({courses});
  } catch(exception) {
    logger.error(exception);
    res.status(400).json({message: exception});
  }
};

module.exports = {searchCourses, getCoursesList};
