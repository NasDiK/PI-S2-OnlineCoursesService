/* eslint-disable react/prop-types */
import React from 'react';
import {MobXProviderContext, observer, inject} from 'mobx-react';
import * as R from 'ramda';

const Provider = ({children, ...stores}) => (
  <MobXProviderContext.Provider value={
    {
      ...React.useContext(MobXProviderContext),
      ...stores
    }
  }
  >
    {children}
  </MobXProviderContext.Provider>
);

const magic = (comp, decorators) => {
  const composeArgs = [];
  const {store} = decorators || {};

  // priority 3
  if (store) {
    if (typeof store === 'string') {
      const storesNames = store.split(/\s*,\s*/);

      composeArgs.push(inject(...storesNames));
    } else {
      composeArgs.push(inject(store));
    }
  }

  composeArgs.push(observer);

  return R.compose(...composeArgs)(comp);
};

export {
  Provider,
  magic
};