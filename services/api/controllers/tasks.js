const config = require('../knexfile.js');
const knex = require('knex')(config.development);

const {
  getTaskById,
  getAnswersLogs,
  searchTasks,
  checkTaskAnswer,
  confirmReview,
  writeTaskLog,
  getTasksByGroupId,
  getAllLogs
} = require('../services/tasks');

const controller = {
  getTaskById: (request) => getTaskById(knex, request),
  getTasksByGroupId: (request) => getTasksByGroupId(knex, request),
  getAnswersLogs: (request) => getAnswersLogs(knex, request),
  searchTasks: (request) => searchTasks(knex, request),
  checkTaskAnswer: (request) => checkTaskAnswer(knex, request),
  confirmReview: (request) => confirmReview(knex, request),
  writeTaskLog: (request) => writeTaskLog(knex, request),
  getAllLogs: () => getAllLogs(knex)
};

module.exports = controller;
