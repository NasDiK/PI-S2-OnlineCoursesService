/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable max-len */
/* eslint-disable no-console */

/**
 * @typedef {import('express').Response} ExpressResponse
 */

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

/**
 * Заготовка ответа
 * @param {ExpressResponse} response
 * @param {number} code
 * @param {{
 *  message JSON
 * }} responseOptions
 * @returns {ExpressResponse}
 */
const baseResponse = (response, code, responseOptions = {
  message: 'OK'
}) => {
  const {message, ...otherOptions} = responseOptions;

  return response.json({message, ...otherOptions}).status(code);
};

module.exports = {
  logger,
  generateError,
  ...databaseMethods,
  baseResponse
};