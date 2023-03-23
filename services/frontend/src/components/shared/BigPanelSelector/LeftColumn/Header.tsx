import React from 'react';
import {Typography as TypographyShared, LinearProgressWithLabel, Button} from '../../../shared';
import s from '../BigPanelSelector.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface iProps {
  title?: string,
  withLinear?: boolean,
  'value'?: number,
  parentId?: number,
  gotoFunc?: () => void
}

const Header = (props: iProps) => (
  <div className={s.header}>
    <div className={s.title}>
      {
        props.parentId && (
          <Button variant={'icon'} onClick={props.gotoFunc}>
            <ArrowBackIcon
              sx={{width: '16px', height: '16px', cursor: 'pointer'}}
            />
          </Button>
        )
      }
      <TypographyShared variant={'body20'} weight={'bold'}>{props.title}</TypographyShared>
    </div>
    {
      props.withLinear && (
        <div className={s.progress}>
          <LinearProgressWithLabel variant={'determinate'} value={props.value || 100} />
        </div>
      )
    }
  </div>
);

export default Header;

