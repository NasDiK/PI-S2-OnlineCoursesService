import React from 'react';
import ColumnElement, {iColumn} from './Components/ColumnElement';

interface iProps {
  columns: Array <iColumn>
}

const BlockElements = ({columns}: iProps) => (
  <React.Fragment>
    {
      columns.map((element, index) =>
        <ColumnElement key={index} element={element} />)
    }
  </React.Fragment>
);

export default BlockElements;