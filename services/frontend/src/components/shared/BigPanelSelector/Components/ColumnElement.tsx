import React from 'react';

export interface iColumn {
  id: number,
  name: string
}

interface iProps {
  element: iColumn
}
const ColumnElement = (props: iProps) => <div>{props.element.name}</div>;

export default ColumnElement;