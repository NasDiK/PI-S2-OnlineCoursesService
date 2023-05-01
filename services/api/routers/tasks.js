/* eslint-disable no-console */
const express = require('express');
const router = express.Router();
const {
  searchTasks,
  getTaskById,
  checkTaskAnswer,
  writeTaskLog,
  confirmReview,
  getTasksByGroupId,
  getAnswersLogs,
  getAllLogs
} = require('../controllers/tasks');
const validateParams = require('../utils/validateParams');
const {logger, baseResponse} = require('../core');

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
    logger.error(err);
    res.send({
      message: err.message,
      status: 500
    });
  }
});

router.post('/checkTaskAnswer', async(req, res) => {
  try {
    validateParams(['taskId', 'answer'], req);
    const result = await checkTaskAnswer(req);

    if (result) {
      return res.status(200).json({result});
    }

    return res.status(301).json({result});

  } catch(err) {
    logger.error(err);
    res.send({
      message: err.message,
      status: 500
    });
  }
});

router.post('/confirmReview', async(req, res) => {
  try {
    validateParams(['taskId', 'userId'], req);
    await confirmReview(req);

    return baseResponse(res, 200);

  } catch(err) {
    logger.error(err);
    res.send({
      message: err.message,
      status: 500
    });
  }
});

router.post('/writeTaskLog', async(req, res) => {
  try {
    await writeTaskLog(req);

    return baseResponse(res, 200);
  } catch(err) {
    logger.error(err);
    res.send({
      message: err.message,
      status: 500
    });
  }
});

router.post('/getTasksByGroupId', async(req, res) => {
  try {
    tasks = await getTasksByGroupId(req);

    res.send(tasks);
  } catch(err) {
    logger.error(err);
    res.send({
      message: err.message,
      status: 500
    });
  }
});

router.post('/getAnswersLogs', async(req, res) => {
  try {
    answers = await getAnswersLogs(req);

    res.send(answers);
  } catch(err) {
    logger.error(err);
    res.send({
      message: err.message,
      status: 500
    });
  }
});

router.post('/getAllLogs', async(req, res) => {
  try {
    answers = await getAllLogs(req);

    res.send(answers);
  } catch(err) {
    logger.error(err);
    res.send({
      message: err.message,
      status: 500
    });
  }
});

module.exports = router;