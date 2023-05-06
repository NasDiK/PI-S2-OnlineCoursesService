const {coupleBy} = require('../../../utils');

module.exports = () => () => {
  test('should work with numeric key', () => {
    const arr = [{id: 2, name: 'kega', addit: 'test'}, {id: 3, name: 'buba', addit: 'test'}];
    const map = coupleBy(arr, 'id', 'name');

    expect(map).toStrictEqual({
      2: 'kega',
      3: 'buba'
    });
  });

  test('should work with string key', () => {
    const arr = [{id: 2, name: 'kega'}, {id: 3, name: 'buba'}];
    const map = coupleBy(arr, 'name', 'id');

    expect(map).toStrictEqual({
      'kega': 2,
      'buba': 3
    });
  });
};