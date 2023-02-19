import React from 'react';
import PropTypes from 'prop-types';
import {MobXProviderContext, observer} from 'mobx-react';

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

Provider.propTypes = {
  children: PropTypes.node
};

const inject = (getStores) => (component) => {
  let allStore = false;

  if (typeof getStores === 'string') {
    allStore = true;
    const storiesNames = getStores.split(',');

    getStores = (all) => {
      const foundStories = {};

      storiesNames.forEach((item) => {
        const name = item.trim();
        const store = all[name];

        if (!store) {
          // eslint-disable-next-line no-console
          console.error(`Store with name ('${name}') not found. Check it!`);
        }

        foundStories[name] = store;
      });

      return foundStories;
    };
  }

  // eslint-disable-next-line react/display-name,react/no-multi-comp
  const Injector = React.forwardRef((props, ref) => {
    const context = React.useContext(MobXProviderContext) || {};
    const newProps = {...props};

    Object.assign(newProps, getStores(context, props) || {});

    if (ref) {
      newProps.ref = ref;
    }

    return React.createElement(component, newProps);
  });

  Injector.wrappedComponent = component;
  Injector.displayName = component.name;

  if (allStore) {
    return Injector;
  }

  return observer(Injector);
};

export {Provider, inject};