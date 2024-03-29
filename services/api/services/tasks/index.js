const getTaskById = require('./getTaskById');
const searchTasks = require('./searchTasks');
const checkTaskAnswer = require('./checkTaskAnswer');
const confirmReview = require('./confirmReview');
const writeTaskLog = require('./writeTaskLog');
const getTasksByGroupId = require('./getTasksByGroupId');
const getAnswersLogs = require('./getAnswersLogs');
const getAllLogs = require('./getAllLogs');

module.exports = {
  getTaskById,
  searchTasks,
  checkTaskAnswer,
  confirmReview,
  writeTaskLog,
  getTasksByGroupId,
  getAnswersLogs,
  getAllLogs
};