const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const controller = {
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
