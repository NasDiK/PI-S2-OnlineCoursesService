// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRandomIndexOfArray = (array: Array<any>) =>
  parseInt((Math.random() * array.length).toString());