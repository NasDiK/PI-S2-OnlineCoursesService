import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import app from './Routes';
import reportWebVitals from './reportWebVitals';
import {init} from './core/init';
//import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {Typography} from './components/shared';
import Routes from './Routes';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

window.onload = () => {
  init().then(() => {
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <Routes />
        </Provider>

      </React.StrictMode>
    );
  });
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
