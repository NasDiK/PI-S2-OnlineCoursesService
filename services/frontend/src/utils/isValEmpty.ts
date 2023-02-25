/* eslint-disable @typescript-eslint/no-explicit-any */
const isValEmpty = (val: any): boolean =>
  [null, undefined, ''].includes(val);

export {isValEmpty};