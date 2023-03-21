/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import s from '../BigPanelSelector.module.scss';
import Typography from '../../../shared/Basic/Typography/Typography';
import DoneIcon from '@mui/icons-material/Done';
import cn from 'classnames';
import {useMatches} from 'react-router';

export interface iRenderable {
  id: number
  type: number //from enums/shared/targetField
}
export interface iElement {
  id: number,
  type: number //from enums/shared/targetFields TODO REQUIRED
  name?: string,
  isDone?: boolean,
  subGroup?: iElement[],
  progress?: number,
  max_note?: number
}

interface iProps {
  element: iElement,
  onClickElement: () => void
}

const ColumnElement = (props: iProps) => {
  const {element, onClickElement} = props;
  const [match] = useMatches();
  const {courseId, taskId}: any = match.params;

  return (
    <div
      className={
        cn(s.element, {
          [s.active]: !element.subGroup?.length && Number(taskId) === element.id
        })
      }
      onClick={onClickElement}
    >
      {
        props.element.isDone &&
        <DoneIcon sx={{width: '17px', height: '17px', marginRight: '8px'}} />
      }
      <Typography variant={'body14'} weight={'regular'}>{props.element.name}</Typography>
      {
        props.element.max_note && (
          <Typography variant={'body14'} weight={'regular'} className={s.maxNote}>
            {`0/${props.element.max_note}`}
          </Typography>
        )
      }
    </div>
  );
};

export default ColumnElement;