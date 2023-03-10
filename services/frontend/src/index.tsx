import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import app from './Routes';
import {init} from './core/init';
//import {createRoot} from 'react-dom/client';
import Routes from './Routes';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

window.onload = () => {
  init().then(() => {
    root.render(
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    );
  });
};
