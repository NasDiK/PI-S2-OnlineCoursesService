const getTaskByApi = (dispatcher, requestParams) =>
  Promise.resolve().then((x) => dispatcher({type: 'SET_TASK', payload: x}));

export {getTaskByApi};