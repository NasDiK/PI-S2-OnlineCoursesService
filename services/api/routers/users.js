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

module.exports = router;