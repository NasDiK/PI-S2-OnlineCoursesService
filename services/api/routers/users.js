const express = require('express');
const controller = require('../controllers/users');
const router = express.Router();

/*
  https://expressjs.com/ru/guide/routing.html
*/
router.get('/', (req, res) => {
  res.send('you are on page users');
});

router.post('/getUsersByRoleName', async(req, res) => {
  const users = await controller.getUsersByRoleName(req);

  res.send(users);
});

router.post('/getUsersByGroup', async(req, res) => {
  const users = await controller.getUsersByGroup(req);

  res.send(users);
});

router.post('/getUsersByIds', async(req, res) => {
  const users = await controller.getUsersByIds(req);

  res.send(users);
});

router.post('/searchUsers', async(req, res) => {
  const users = await controller.searchUsers(req);

  res.send(users);
});

router.post('/setUserInfo', async(req, res) => {
  const users = await controller.setUserInfo(req);

  res.send(users);
});

router.post('/deleteUserById', async(req, res) => {
  const users = await controller.deleteUserById(req);

  res.send(users);
});

module.exports = router;