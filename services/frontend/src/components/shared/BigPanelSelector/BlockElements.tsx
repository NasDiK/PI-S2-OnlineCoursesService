import React from 'react';
import ColumnElement, {iElement} from './Components/ColumnElement';
import s from './BigPanelSelector.module.scss';

interface iProps {
  elements?: Array <iElement>,
  onClickElement: (idx: number) => void
}

const BlockElements = ({elements, onClickElement}: iProps) => {
  const onClick = (elementIndex: number) => {
    onClickElement(elementIndex);
  };

  return (
    <div className={s.blockElements}>
      {
        elements?.map((element, index) => (
          <ColumnElement
            key={index}
            element={element}
            onClickElement={() => onClick(index)}
          />
        ))
      }
    </div>
  );
};

export default BlockElements;