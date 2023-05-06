import React from 'react';
import {magic} from '../mobxUtils';

// eslint-disable-next-line react/prop-types
const TComp = ({writeIncrement, inc}) => (
  <div>
    <h2>{inc}</h2>
    <button onClick={writeIncrement}>{'Добавить счетчик'}</button>
  </div>
);

const mapStore = ({testStore}) => {
  return {
    writeIncrement: testStore.writeIncrement,
    inc: testStore.counter
  };
};

export default magic(TComp, {store: mapStore});