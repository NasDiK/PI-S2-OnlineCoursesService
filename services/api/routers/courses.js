/* eslint-disable no-console */
const express = require('express');
const controller = require('../controllers/courses');
const coursesRouter = express.Router();

coursesRouter.post('/searchCourses', controller.searchCourses);

module.exports = coursesRouter;