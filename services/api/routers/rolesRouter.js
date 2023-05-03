const express = require('express');
const controller = require('../controllers/roles');
const router = express.Router();

router.post('/getAllRoles', async(req, res) => {
  const roles = await controller.getAllRoles(req);

  res.send(roles);
});

router.post('/setUsersRoles', async(req, res) => {
  const roles = await controller.setUsersRoles(req);

  res.send(roles);
});

module.exports = router;