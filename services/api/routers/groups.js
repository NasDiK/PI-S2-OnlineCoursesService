const express = require('express');
const groupsController = require('../controllers/groups');
const groupsRouter = express.Router();

groupsRouter.post('/createGroup', async(req, res) => {
  const result = await groupsController.createGroup(req);

  res.json({message: result});
});
groupsRouter.post('/getGroups', async(req, res) => {
  const groups = await groupsController.getGroups();

  res.send(groups);
});
groupsRouter.post('/getGroupsById', async(req, res) => {
  const groups = await groupsController.getGroupsById(req);

  res.send(groups);
});
groupsRouter.post('/getUsersInGroups', async(req, res) => {
  const usersInGroups = await groupsController.getUsersInGroup(req);

  res.send(usersInGroups);
});
groupsRouter.post('/saveGroupChanges', async(req, res) => {
  const result = await groupsController.saveGroupChanges(req);

  res.json({message: result});
});

module.exports = groupsRouter;