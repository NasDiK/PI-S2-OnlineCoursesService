/**
 * Конвертит число в строку, если неудача - вернёт входное.
 * @param {any} _val Значение
 * @returns {[try: boolean, result: any]} Возвращает число или исходное значение
 */
export const tryConvertToNumber = (_val) => {
  try {
    const _numericVal = Number(_val);

    return Number.isNaN(_numericVal) ? [false, _val] : [true, _numericVal];
  } catch(_) {
    return [false, _val];
  }
};

/**
 * Конвертит текст в массив, если неудача - вернёт входное.
 * @param {any} _val Значение
 * @returns {[try: boolean, result: any[]]} Возвращает масси или исходное значение
 */
export const tryConvertToArray = (_val) => {
  try {
    const _parsed = JSON.parse(_val);

    return Array.isArray(_parsed) ? [true, _parsed] : [false, _val];
  } catch(_) {
    return [false, _val];
  }
};