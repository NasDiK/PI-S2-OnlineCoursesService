const express = require('express');
const coursesController = require('../controllers/courses');
const {logger} = require('../core');
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

coursesRouter.post('/createCourse', async(req, res) => {
  const _createdCourse = await coursesController(req, res);

  logger.debug(JSON.stringify(_createdCourse, null, '  '));
  res.send(_createdCourse);
});

module.exports = coursesRouter;