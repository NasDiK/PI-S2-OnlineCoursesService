const express = require('express');
const router = express.Router();
const {getReviewsLogs} = require('../controllers/reviews');
const {logger} = require('../core');

router.post('/getReviewsLogs', async(req, res) => {
  try {
    const _logs = await getReviewsLogs(req);

    res.send(_logs);
  } catch(err) {
    logger.error(err);
    res.send({
      message: err.message,
      status: 500
    });
  }
});

module.exports = router;