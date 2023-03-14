import React from 'react';
import {ButtonProps} from '../Button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconButton = (props: ButtonProps) => <button>{props.children}</button>;

export default IconButton;