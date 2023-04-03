/* eslint-disable no-console */
const express = require('express');
const controller = require('../controllers/groups');
const groupsRouter = express.Router();

groupsRouter.post('/createGroup', controller.createGroup);
groupsRouter.post('/getGroups', controller.getGroups);

module.exports = groupsRouter;