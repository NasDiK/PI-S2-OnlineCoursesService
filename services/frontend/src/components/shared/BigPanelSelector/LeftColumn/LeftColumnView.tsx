import s from '../BigPanelSelector.module.scss';
import React, {useEffect, useState} from 'react';
import BlockElements from '../BlockElements';
import Header from './Header';
import {iElement} from '../Components/ColumnElement';
import {shared} from '@local/enums';
import {useNavigate} from 'react-router';
interface iProps {
  element: iElement,
  elementLink?: string,
  withLinear?: boolean,
  onClickElement?: (element) => void
}

type iElementExtended = {
  element: iElement,
  parentId?: number
}

const onClickElement = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, max-len
  elem: iElement | undefined, elemIdx: number, setFunc: any, elementLink: string | undefined, navigator, handleElementFunc
) => {
  const targetElement = elem?.subGroup?.[elemIdx];

  if (targetElement?.type === shared.targetFields.ELEMENT) {
    // eslint-disable-next-line max-len
    if (handleElementFunc) {
      return handleElementFunc(targetElement);
    }
    navigator(`${elementLink}${targetElement?.id}`);

  } else {
    setFunc({element: targetElement, parentId: elem?.id});
  }
};

const searchElementById = (rootElement: iElement | undefined, searchableId: number | undefined) => {
  searchableId; //? при желании дерево сделать
  const searchedParentId = undefined;

  return [rootElement, searchedParentId];
};

const goToParentFunc = (
  rootElement: iElement | undefined, parentId: number | undefined, setFunc
) => {
  const [parentElement, parentParentId] = searchElementById(rootElement, parentId);

  setFunc({element: parentElement, parentId: parentParentId});
};

const LeftColumnView = (props: iProps) => {
  const {element, elementLink, withLinear = false} = props;
  const [curElem, setCurElem] = useState<iElementExtended>({element, parentId: undefined});
  const navigator = useNavigate();

  useEffect(() => {
    setCurElem({element});
  }, [element]);

  return (
    <div className={s.leftColumn}>
      <Header
        title={curElem?.element?.name}
        withLinear={withLinear}
        value={curElem?.element?.progress || 0}
        gotoFunc={() => goToParentFunc(element, curElem.parentId, setCurElem)}
        parentId={curElem.parentId}
      />
      <div className={s.blockWrapper}>
        <BlockElements
          elements={curElem?.element?.subGroup}
          onClickElement={
            (idx: number) =>
              // eslint-disable-next-line max-len
              onClickElement(curElem?.element, idx, setCurElem, elementLink, navigator, props.onClickElement)
          }
        />
      </div>
    </div>
  );
};

export default LeftColumnView;