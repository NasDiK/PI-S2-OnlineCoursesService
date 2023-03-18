/**
 * Валидирует схему
 * @param {string []} requiredParams
 * @param {import('express').Request} request
 */
const validateParams = (requiredParams, request) => {
  const toFix = requiredParams.filter((param) =>
    !Object.keys(request.body || {}).includes(param));

  if (toFix.length) {
    throw new Error(`Невалидная схема. Требуются ${toFix.join(', ')}`);
  }
};

module.exports = validateParams;