/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {Box, Alert, LinearProgress} from '@mui/material';

interface iAlert {
  variant?: 'info' | 'warning' | 'error' | 'success',
  children?: React.ReactNode,
  width?: 'fit-content' | number,
  margin?: number | string,
  withClose?: boolean,
  debounceTime?: number //время уничтожения https://mui.com/joy-ui/react-linear-progress/
}

const wrapInDebounceProgress = (component: React.ReactNode) => (
  <div>
    {component}
    <LinearProgress />
  </div>
);

const wrapInBox = (sx: object, component: React.ReactNode) => (
  <Box sx={sx}>
    {component}
  </Box>
);

const AlertComponent = (props: iAlert) => {
  const {variant = 'info', children, width = 0, withClose = false, debounceTime, margin} = props;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (debounceTime) {
      setTimeout(() => {
        setIsVisible(false);
      }, debounceTime);
    }
  }, []);

  const additionalProps: {
    onClose?: any
  } = {};

  if (withClose) {
    additionalProps.onClose = () => setIsVisible(!isVisible);
  }

  let result: React.ReactNode = (
    <Alert
      {...additionalProps}
      severity={variant}
    >
      {children}
    </Alert>
  );

  if (debounceTime) {
    result = wrapInDebounceProgress(result);
  }

  if (width || margin) {
    result = wrapInBox({width, margin}, result);
  }

  return isVisible && result || null;
};

export default AlertComponent;