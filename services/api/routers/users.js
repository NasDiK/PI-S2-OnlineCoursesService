const express = require('express');
const router = express.Router();

/*
  https://expressjs.com/ru/guide/routing.html
*/
router.get('/', (req, res) => {
  res.send('you are on page users');
});

module.exports = router;