const express = require('express');
const controller = require('../controllers/roles');
const router = express.Router();

router.post('/getRolesByName', async(req, res) => {
  const roles = await controller.getRolesByName(req);

  res.send(roles);
});

router.post('/getRoles', async(req, res) => {
  const roles = await controller.getRoles(req);

  res.send(roles);
});

module.exports = router;