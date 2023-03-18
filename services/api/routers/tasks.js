const express = require('express');
const router = express.Router();
const {getTaskById} = require('../controllers/tasks');
const validateParams = require('../utils/validateParams');

router.post('/getTaskById', async(req, res) => {
  const requiredParams = ['taskId'];

  try {
    console.log(req.headers.params);
    validateParams(requiredParams, req);

    const [task] = await getTaskById(req);

    console.log(task);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(task));
  } catch(err) {
    res.send({
      message: err.message,
      status: 500
    });
  }
});

module.exports = router;