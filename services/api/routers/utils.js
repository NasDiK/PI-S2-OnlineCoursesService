/* eslint-disable no-console */
//TODO в обычных логгер ещё

const getCurrentDate = () => {
  const now = new Date();

  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
};

const logger = {
  error: (message) => console.log(`[${getCurrentDate()}] Error: ${message}`),
  debug: (message) => console.log(`[${getCurrentDate()}] Information: ${message}`)
};

module.exports = {
  logger
};