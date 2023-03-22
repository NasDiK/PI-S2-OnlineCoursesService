const {isEqualArrays} = require('../../../utils');

module.exports = () => () => {
  test('should return false', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, '2', 3];

    expect(isEqualArrays(arr1, arr2)).toBeFalsy();
  });

  test('should return true', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];

    expect(isEqualArrays(arr1, arr2)).toBeTruthy();
  });

  test('withConvertTypes should return true', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, '2', 3];

    expect(isEqualArrays(arr1, arr2, true)).toBeTruthy();
  });

  test('should throw different length error', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, '2', 3];

    expect(() => isEqualArrays(arr1, arr2)).toThrow(/arr1 and arr2 has different length/);

    const _arr1 = [1, 2, 3];
    const _arr2 = [1, '2', 3, 4];

    expect(() => isEqualArrays(_arr1, _arr2)).toThrow(/arr1 and arr2 has different length/);
  });

  test('should throw invalidTypes error', () => {
    const arr1 = 1;
    const arr2 = [1, '2', 3];

    expect(() => isEqualArrays(arr1, arr2)).toThrow(/arr1 or arr2 is not array/);

    const _arr1 = [1, 2, 3];
    const _arr2 = 2;

    expect(() => isEqualArrays(_arr1, _arr2)).toThrow(/arr1 or arr2 is not array/);
  });
};