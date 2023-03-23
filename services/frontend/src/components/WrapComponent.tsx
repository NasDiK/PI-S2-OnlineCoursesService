import React from 'react';
import {store as userStore} from '../stores/core';
import {Provider} from 'react-redux';

interface WrapComponent {
  component: React.ReactNode
}

const WrapComponent = (props: WrapComponent) => {
  const {component} = props;

  //Компонент для инжекта фундаментальных стор в страницы
  return (
    <Provider store={userStore}>
      {component}
    </Provider>
  );
};

export default WrapComponent;