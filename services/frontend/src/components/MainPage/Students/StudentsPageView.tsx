import React, {useEffect, useState} from 'react';
import {BigPanelSelector} from '../../shared';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';
import StudentsTableComponent from './components/StudentsTableComponent';
import {getGroups} from '../../../api/groups';
import {targetFields} from '@local/enums/shared';
import {useSelector} from 'react-redux';

const minimalElement: iElement = {
  id: -1,
  type: shared.targetFields.ELEMENT_GROUP,
  name: 'undefined'
};
const StudentsPageView = () => {
  // eslint-disable-next-line
  const userId = useSelector((state: any) => state.userStore.userData.userId);
  const [groupElement, setGroupElement] = useState<iElement>();

  useEffect(() => {
    getGroups().then((groups) => {
      // eslint-disable-next-line max-nested-callbacks
      const subGroup = groups.map(({id, title}) => {
        return {
          id,
          name: title,
          type: targetFields.ELEMENT
        };
      });

      setGroupElement({id: groups[0].id,
        name: 'Выберите группу',
        type: targetFields.ELEMENT_GROUP,
        subGroup});
    });
  }, [userId]);

  return (
    <BigPanelSelector
      element={groupElement || minimalElement}
      renderableComponent={<StudentsTableComponent />}
      elementLink={`/students/`}
      withLinear={false}
    />
  );
};

export default StudentsPageView;