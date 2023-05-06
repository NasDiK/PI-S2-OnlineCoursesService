const {
  isEqualArrays,
  array2Object,
  coupleBy
} = require('./methods/utils');

describe('utils', () => {
  describe('isEqualArrays', isEqualArrays());
  describe('array2Object', array2Object());
  describe('coupleBy', coupleBy());
});