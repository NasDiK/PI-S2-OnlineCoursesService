import React from 'react';
import s from '../BigPanelSelector.module.scss';
import Typography from '../../../shared/Basic/Typography/Typography';
import DoneIcon from '@mui/icons-material/Done';

export interface iElement {
  id: number,
  name?: string,
  isDone?: boolean,
  subGroup?: iElement[],
  render?: React.ReactNode //required to last-child
}

interface iProps {
  element: iElement
}
const ColumnElement = (props: iProps) => (
  <div className={s.element}>
    {props.element.isDone && <DoneIcon sx={{width: '17px', height: '17px', marginRight: '8px'}} />}
    <Typography variant={'body14'} weight={'regular'}>{props.element.name}</Typography>
  </div>
);

export default ColumnElement;