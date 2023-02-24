const isValEmpty = (val: any): boolean =>
  [null, undefined, ''].includes(val);

export {isValEmpty};