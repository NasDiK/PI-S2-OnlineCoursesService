/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {BigPanelSelector} from '../../shared';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';
import StudentsTableComponent from './components/StudentsTableComponent';
import {getGroups} from '../../../api/groups';
import {targetFields} from '@local/enums/shared';
import {Provider} from 'react-redux';
import {store as studentsStore} from '../../../stores/components/Students/StudentsReducer';
import PropTypes from 'prop-types';
import {magic} from '../../../mobxUtils';

const minimalElement: iElement = {
  id: -1,
  type: shared.targetFields.ELEMENT_GROUP,
  name: 'undefined'
};
const StudentsPageView = ({UserStore}) => {
  const {userId} = UserStore;
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
      renderableComponent={
        (
          <Provider store={studentsStore}>
            <StudentsTableComponent />
          </Provider>
        )
      }
      elementLink={`/students/`}
      withLinear={false}
    />
  );
};

StudentsPageView.propTypes = {
  UserStore: PropTypes.object
};

export default magic(StudentsPageView, {store: 'UserStore'});