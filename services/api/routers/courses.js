/* eslint-disable no-console */
const express = require('express');
const controller = require('../controllers/courses');
const coursesRouter = express.Router();

coursesRouter.post('/getAllCurses', controller.getAllCurses);
coursesRouter.post('/getCoursesListByUsers', controller.getCoursesListByUsers);

module.exports = coursesRouter;