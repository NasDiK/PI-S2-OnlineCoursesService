import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {init} from './core/init';
import Routes from './Routes';
import {Provider} from './mobxUtils';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

window.onload = () => {
  init().then(({NotifyStore, UserStore}) => {
    root.render(
      <React.StrictMode>
        <Provider NotifyStore={NotifyStore} UserStore={UserStore}>
          <Routes />
        </Provider>
      </React.StrictMode>
    );
  });
};
