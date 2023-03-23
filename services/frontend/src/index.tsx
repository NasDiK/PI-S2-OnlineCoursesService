import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {init} from './core/init';
import Routes from './Routes';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

window.onload = () => {
  init().then(() => {
    root.render(
      <React.Fragment>
        <div id={'notify-portal'} />
        <React.StrictMode>
          <Routes />
        </React.StrictMode>
      </React.Fragment>
    );
  });
};
