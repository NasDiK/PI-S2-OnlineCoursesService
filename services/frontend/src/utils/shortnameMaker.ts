export const shortnameMaker = (_name) => {
  if (_name === null || !_name.includes(' ')) {
    return '';
  }
  /* Если у кого то будет желание может потом сделал этот метод пиздатым */
  const _splitFN = _name.split(' ');

  switch (_splitFN.length) {
    case 1:
      return _splitFN[0];
    case 2:
      return `${_splitFN[0]} ${_splitFN[1][0]}.`;
    case 3:
    default:
      return `${_splitFN[0]} ${_splitFN[1][0]}. ${_splitFN[2][0]}.`;
  }
};