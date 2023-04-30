/* eslint-disable no-proto */
export const isObject = (object) => object.__proto__.toString() === '[object Object]';