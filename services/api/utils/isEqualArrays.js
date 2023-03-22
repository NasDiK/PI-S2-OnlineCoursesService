/**
 * Сравнивает два массива по значению
 * ПРИМЕЧАНИЕ: Только 1 уровень вложенности
 * F.e.:
 * isEqualArrays([1,2,3],[2,1,3]) //true
 * isEqualArrays([1,'2',3],[2,1,3]) //false
 * isEqualArrays([1,'2',3],[2,1,3], true) //true
 * @param {any[]} arr1
 * @param {any[]} arr2
 */
const isEqualArrays = (arr1, arr2, withTypeConverting = false) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('arr1 or arr2 is not array');
  }

  let first = arr1;
  let second = arr2;

  if (withTypeConverting) {
    first = first.map((val) => val.toString());
    second = second.map((val) => val.toString());
  }

  if (first.length !== second.length) {
    throw new Error('arr1 and arr2 has different length');
  }

  const containedValues = first.reduce((acc, curV) => {
    if (second.includes(curV)) {
      const indexOf = second.indexOf(curV);

      second.splice(indexOf, 1);
    } else {
      acc.push(curV);
    }

    return acc;
  }, []);

  if (containedValues.length) {
    return false;
  }

  return true;
};

module.exports = isEqualArrays;