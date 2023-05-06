module.exports = (array, fieldKey, fieldVal) => array.reduce((acc, curElement) => {
  const fKey = curElement[fieldKey];
  const fVal = curElement[fieldVal];

  acc[fKey] = fVal;

  return acc;
}, {});