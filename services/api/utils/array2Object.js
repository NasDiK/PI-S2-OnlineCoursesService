module.exports = (array, key) => array.reduce((acc, curElement) => {
  const keyedVal = curElement[key];

  acc[keyedVal] = curElement;

  return acc;
}, {});