/* eslint-disable id-denylist */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {Tabs as MuiTabs, Tab} from '@mui/material';

interface iOption {
  value: any,
  label: string,
  disabled?: boolean
}

interface iPossibleProps {
  tabs?: Array<iOption>,
  onChange?: (val) => void,
  value: any
}

const handleChange = (val, fn) => {
  fn(val);
};

const TabsView = (props: iPossibleProps) => {
  const {tabs = [], onChange, value: selectedVal} = props;

  return (
    <MuiTabs
      onChange={(_, val) => handleChange(val, onChange)}
      value={selectedVal}
    >
      {
        tabs.map(({value: val, label, disabled}, idx) =>
          <Tab value={val} label={label} key={idx} disabled={disabled} />)
      }
    </MuiTabs>
  );
};

export default TabsView;