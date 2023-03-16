import s from '../BigPanelSelector.module.scss';
import React, {useState} from 'react';
import BlockElements from '../BlockElements';
import Header from './Header';
import {iElement} from '../Components/ColumnElement';
import enums from '@local/enums';
import {useNavigate} from 'react-router';
interface iProps {
  element: iElement,
  elementLink?: string
}

type iElementExtended = {
  element: iElement,
  parentId?: number
}

const onClickElement = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elem: iElement, elemIdx: number, setFunc: any, elementLink: string | undefined, navigator
) => {
  const targetElement = elem.subGroup?.[elemIdx];

  if (targetElement?.type === enums.shared.targetFields.ELEMENT) {
    navigator(`${elementLink}${targetElement?.id}`);
    // alert(`Открыли элемент такой то ${targetElement?.id}`);
  } else {
    setFunc({element: targetElement, parentId: elem.id});
  }
};

const searchElementById = (rootElement: iElement, searchableId: number | undefined) => {
  searchableId; //?
  const searchedParentId = undefined;

  return [rootElement, searchedParentId];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const goToParentFunc = (rootElement: iElement, parentId: number | undefined, setFunc: any) => {
  const [parentElement, parentParentId] = searchElementById(rootElement, parentId);

  setFunc({element: parentElement, parentId: parentParentId});
};

const LeftColumnView = (props: iProps) => {
  const {element, elementLink} = props;
  const [curElem, setCurElem] = useState<iElementExtended>({element, parentId: undefined});
  const navigator = useNavigate();

  return (
    <div className={s.leftColumn}>
      <Header
        title={curElem.element.name}
        withLinear={true}
        value={curElem.element.progress || 0}
        gotoFunc={() => goToParentFunc(element, curElem.parentId, setCurElem)}
        parentId={curElem.parentId}
      />
      <div className={s.blockWrapper}>
        <BlockElements
          elements={curElem.element.subGroup}
          onClickElement={
            (idx: number) =>
              onClickElement(curElem.element, idx, setCurElem, elementLink, navigator)
          }
        />
      </div>
    </div>
  );
};

export default LeftColumnView;