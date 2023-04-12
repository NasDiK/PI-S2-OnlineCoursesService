/* eslint-disable no-console */
const express = require('express');
const coursesController = require('../controllers/courses');
const coursesRouter = express.Router();

coursesRouter.post('/getAllCourses', coursesController.getAllCourses);
coursesRouter.post('/getCoursesListByUsers', coursesController.getCoursesListByUsers);

module.exports = coursesRouter;