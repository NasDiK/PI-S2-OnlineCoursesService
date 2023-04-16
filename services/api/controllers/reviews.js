const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {getReviewsLogs} = require('../services/reviews');

const controller = {
  getReviewsLogs: (request) => getReviewsLogs(knex, request)
};

module.exports = controller;