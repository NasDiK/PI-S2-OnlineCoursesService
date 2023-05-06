/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable max-len */
/* eslint-disable no-console */

/**
 * @typedef {import('express').Response} ExpressResponse
 */

const {coupleBy} = require('../utils');
const databaseMethods = require('./databaseMethods');
const {roles: {roles: rolesEnum}} = require('@local/enums');

const roleNameMap = {
  //как по дурацки, конечно бы либо колонку enum_id, либо уже в енумы строку писать...
  'admin': rolesEnum.ADMIN,
  'student': rolesEnum.STUDENT,
  'teacher': rolesEnum.TEACHER
};

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

const getRoleEnumsMap = async() => {
  const rolesDBIds = await databaseMethods.getRolesIds();
  const _rolesEnumEqual = rolesDBIds.map(({id, name}) => {
    return {
      id,
      enumId: roleNameMap[name]
    };
  });

  return coupleBy(_rolesEnumEqual, 'id', 'enumId');
};

module.exports = {
  logger,
  generateError,
  ...databaseMethods,
  baseResponse,
  roleNameMap,
  getRoleEnumsMap
};