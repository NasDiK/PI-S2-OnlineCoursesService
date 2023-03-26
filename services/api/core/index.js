/* eslint-disable max-len */
/* eslint-disable no-console */
const databaseMethods = require('./databaseMethods');

const getCurrentDate = () => {
  const now = new Date();

  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
};

const logger = {
  error: (error) => {
    console.log(`[${getCurrentDate()}] Error: ${error.message}. ${error.body && JSON.stringify(error.body)}`);
  },
  debug: (message) => console.log(`[${getCurrentDate()}] Information: ${message}`)
};

const generateError = (message, body) => {
  const err = new Error(message);

  err.body = body;

  return err;
};

module.exports = {
  logger,
  generateError,
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  ...databaseMethods
};