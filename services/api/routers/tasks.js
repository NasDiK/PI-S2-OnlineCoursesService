const express = require('express');
const router = express.Router();
const {searchTasks, getTaskById} = require('../controllers/tasks');
const validateParams = require('../utils/validateParams');

router.post('/getTaskById', async(req, res) => {
  const requiredParams = ['taskId'];

  try {
    validateParams(requiredParams, req);

    const [task] = await getTaskById(req);

    res.send(task);
  } catch(err) {
    res.send({
      message: err.message,
      status: 500
    });
  }
});

router.post('/searchTasks', async(req, res) => {
  try {
    const tasks = await searchTasks(req);

    res.send({tasks});
  } catch(err) {
    res.send({
      message: err.message,
      status: 500
    });
  }
});

module.exports = router;