import React from 'react';
import {CircularProgress} from '@mui/material';
import s from './Loader.module.scss';

interface iPossibleProps {
  size?: number,
  thickness?: number
}

const Loader = (props: iPossibleProps) => {
  const {size, thickness} = props;

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <CircularProgress
          size={size || 32}
          thickness={thickness || 7}
        />
      </div>
    </div>
  );
};

export default Loader;