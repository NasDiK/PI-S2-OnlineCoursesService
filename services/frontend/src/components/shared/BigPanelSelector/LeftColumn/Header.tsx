import React from 'react';
import {Typography as TypographyShared, LinearProgressWithLabel} from '../../../shared';
import s from '../BigPanelSelector.module.scss';

interface iProps {
  title?: string,
  withLinear?: boolean,
  'value'?: number
}

const Header = (props: iProps) => (
  <div className={s.header}>
    <div className={s.title}>
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

