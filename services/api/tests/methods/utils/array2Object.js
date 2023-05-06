const {array2Object} = require('../../../utils');

module.exports = () => () => {
  test('should work with numeric key', () => {
    const arr = [{id: 2, name: 'kega'}, {id: 3, name: 'buba'}];
    const map = array2Object(arr, 'id');

    expect(map).toStrictEqual({
      2: {id: 2, name: 'kega'},
      3: {id: 3, name: 'buba'}
    });
  });

  test('should work with string key', () => {
    const arr = [{id: 2, name: 'kega'}, {id: 3, name: 'buba'}];
    const map = array2Object(arr, 'name');

    expect(map).toStrictEqual({
      'kega': {id: 2, name: 'kega'},
      'buba': {id: 3, name: 'buba'}
    });
  });
};