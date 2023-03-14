import React from 'react';
import {Typography as TypographyShared, LinearProgressWithLabel, Button} from '../../../shared';
import s from '../BigPanelSelector.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface iProps {
  title?: string,
  withLinear?: boolean,
  'value'?: number
}

const Header = (props: iProps) => (
  <div className={s.header}>
    <div className={s.title}>
      <Button variant={'roundThin'}>
        <ArrowBackIcon
          sx={{width: '16px', height: '16px', marginRight: '8px', cursor: 'pointer'}}
        />
      </Button>

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
