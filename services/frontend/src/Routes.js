import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader-react18/StyleContext';
import {Provider} from '@mobxUtils';
import RouterStore from './stores/Router';
import configureStore from './core/configureStore';
import StoreWrapper from './core/storeWrapper';
import GlobalWrapper from './core/Global';

const AppContext = {
  insertCss: (...styles) => {
    const removeCss = styles.map((style) => style._insertCss());

    return () => removeCss.forEach((dispose) => dispose());
  }
};

export default () => { // eslint-disable-line react/display-name
  const {stores} = configureStore();

  return (
    <StyleContext.Provider value={AppContext}>
      <Provider {...stores} RouterStore={RouterStore}>
        <BrowserRouter>
          <GlobalWrapper>
            <Switch>
              {
                (
                  <Route
                    exact={true}
                    path='/test'
                    render={(props) => <StoreWrapper {...props} name={'test'} />}
                  />
                )
              }
              <Route render={() => <div>{'Miss'}</div>} />
            </Switch>
          </GlobalWrapper>
        </BrowserRouter>
      </Provider>
    </StyleContext.Provider>
  );
};