/* eslint-disable no-console */
const express = require('express');
const controller = require('../controllers/groups');
const groupsRouter = express.Router();

groupsRouter.post('/createGroup', controller.createGroup);
groupsRouter.post('/getGroups', controller.getGroups);
groupsRouter.post('/getUsersInGroups', controller.getUsersInGroup);
groupsRouter.post('/saveGroupChanges', controller.saveGroupChanges);

module.exports = groupsRouter;