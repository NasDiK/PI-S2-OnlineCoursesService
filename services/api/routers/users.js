const express = require('express');
const controller = require('../controllers/users');
const router = express.Router();

/*
  https://expressjs.com/ru/guide/routing.html
*/
router.get('/', (req, res) => {
  res.send('you are on page users');
});

router.post('/getUsersByRole', controller.getUsersByRole);

module.exports = router;