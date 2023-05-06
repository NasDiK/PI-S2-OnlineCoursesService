/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import {store as userStore} from '../stores/core';
// import {Provider} from 'react-redux';
import {magic} from '../mobxUtils';
import {Alert, Snackbar} from '@mui/material';

interface WrapComponent {
  component: React.ReactNode,
  notifiers: Array<number>,
  notifiersObject: {
    [id: string]: iNotify
  },
  dropNotifier: (id) => void
}

const WrapComponent = (props: WrapComponent) => {
  const {component, notifiers, notifiersObject, dropNotifier} = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClose = (_id: number, event?: React.SyntheticEvent | Event, reason?: string) => {
    dropNotifier(_id);
  };

  //Компонент для инжекта фундаментальных стор в страницы
  return (
    <React.Fragment>
      {
        notifiers?.length ? notifiers.map((id, idx) => {
          const _notifier = notifiersObject[id];

          return (
            <Snackbar
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              open={true}
              onClose={(ev, reason) => handleClose(id, ev, reason)}
              autoHideDuration={_notifier.time}
              key={idx}
            >
              <Alert
                severity={_notifier.variant}
                sx={{width: '300px'}}
                onClose={() => handleClose(id)}
              >
                {_notifier.message}
              </Alert>
            </Snackbar>
          );
        }) : null
      }
      {component}
    </React.Fragment>
  );
};

const mapStore = ({NotifyStore}) => {
  return {
    notifiers: NotifyStore.notifiers,
    notifiersObject: NotifyStore.notifiersObject,
    dropNotifier: NotifyStore.dropNotifier
  };
};

export default magic(WrapComponent, {store: mapStore});