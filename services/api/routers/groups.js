const express = require('express');
const controller = require('../controllers/groups');
const groupsRouter = express.Router();

groupsRouter.post('/createGroup', async(req, res) => {
  const result = await controller.createGroup(req);

  res.json({message: result});
});
groupsRouter.post('/getGroups', async(req, res) => {
  const groups = await controller.getGroups();

  res.send(groups);
});
groupsRouter.post('/getUsersInGroups', async(req, res) => {
  const usersInGroups = await controller.getUsersInGroup(req);

  res.send(usersInGroups);
});
groupsRouter.post('/saveGroupChanges', async(req, res) => {
  const result = await controller.saveGroupChanges(req);

  res.json({message: result});
});

module.exports = groupsRouter;