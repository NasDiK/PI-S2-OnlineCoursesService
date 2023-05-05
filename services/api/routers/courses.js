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
  const _createdCourse = await coursesController.createCourse(req, res);

  logger.debug(`createdCourse ${JSON.stringify(_createdCourse, null, '  ')}`);
  res.send(_createdCourse);
});

coursesRouter.post('/editCourse', async(req, res) => {
  const _updatedCourse = await coursesController.editCourse(req, res);

  logger.debug(`updatedCourse ${JSON.stringify(_updatedCourse, null, '  ')}`);
  res.send(_updatedCourse);
});

module.exports = coursesRouter;