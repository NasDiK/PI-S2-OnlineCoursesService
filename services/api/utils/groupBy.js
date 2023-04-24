const groupBy = (arr, key) => {
  const result = arr.reduce((acc, curV) => {
    const keyVal = curV[key];

    if (!acc[keyVal]) {
      acc[keyVal] = [curV];
    } else {
      acc[keyVal].push(curV);
    }

    return acc;
  }, {});

  return result;
};

module.exports = groupBy;