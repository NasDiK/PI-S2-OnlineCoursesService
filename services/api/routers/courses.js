const express = require('express');
const coursesController = require('../controllers/courses');
const coursesRouter = express.Router();

coursesRouter.post('/getAllCourses', async(req, res) => {
  const courses = await coursesController.getAllCourses();

  res.send(courses);
});

coursesRouter.post('/getCoursesListByUsers', async(req, res) => {
  const courses = await coursesController.getCoursesListByUsers(req);

  res.send(courses);
});

coursesRouter.post('/searchCourses', async(req, res) => {
  const courses = await coursesController.searchCourses(req);

  res.send(courses);
});

module.exports = coursesRouter;