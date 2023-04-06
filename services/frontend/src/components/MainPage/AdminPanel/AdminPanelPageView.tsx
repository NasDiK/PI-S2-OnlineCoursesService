import React, {useEffect, useState} from 'react';
import s from './AdminPanel.module.scss';
import Modal from '../../shared/Basic/Modal/Modal';
import {getCoursesList} from '../../../api/courses';
import {useSelector} from 'react-redux';
import {BigPanelSelector} from '../../shared';
import {getUsersByRole} from '../../../api/users';
import AddUserSelectComponent from './components/AddUserSelectComponent';
import {createGroup, getGroups, getUsersInGroups} from '../../../api/groups';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';
import {fieldType, targetFields} from '@local/enums/shared';
import {useMatches} from 'react-router';
import DirectoryField from '../../shared/Basic/DirectoryField/DirectoryField';
import Button from '../../shared/Basic/Button/Button';

const minimalElement: iElement = {
  id: -1,
  type: shared.targetFields.ELEMENT_GROUP,
  name: 'undefined'
};

const AdminPanelPageView = () => {
  // eslint-disable-next-line
  const userId = useSelector((state: any) => state.userStore.userData.userId);
  // eslint-disable-next-line
  const [mainElement, setMainElement] = useState<any>();
  // eslint-disable-next-line
  const [users, setUsers]: any = useState<any>();
  const [groupElement, setGroupElement] = useState<iElement>();
  const [match] = useMatches();
  const {groupId} = match.params;

  let name;
  let courseId;

  useEffect(() => {
    getCoursesList([userId]).then((x) => {
      setMainElement(x);
    });
    getUsersByRole(12).then((x) => {
      setUsers(x);
    });
    getGroups().then(({groups}) => {
      // eslint-disable-next-line max-nested-callbacks
      const subGroups = groups.map((el) => {
        const subGroup = {
          id: el.id,
          name: el.title,
          type: targetFields.ELEMENT
        };

        return subGroup;
      });

      setGroupElement({id: groups[0].id,
        name: 'Выберите группу',
        type: targetFields.ELEMENT_GROUP,
        subGroup: subGroups});
    });

    getUsersInGroups(groupId).then((x) => {
      // eslint-disable-next-line no-console
      console.log(x);
    });
  }, [userId]);

  const options = mainElement?.courses.map((el) => {
    // eslint-disable-next-line id-denylist
    return {label: el.title, value: el.id};
  });

  const onChangeName = (val) => {
    name = val;
  };

  const onChangeCourse = (val) => {
    courseId = val;
  };
  const addGroup = () => {

    createGroup(name, courseId).then((x) => {
      // eslint-disable-next-line no-console
      console.log(x);
    });
  };

  return (
    <div>
      <div className={s.groupsSelector}>
        <BigPanelSelector
          element={groupElement || minimalElement}
          renderableComponent={<AddUserSelectComponent />}
          elementLink={`/admin-panel/`}
          withLinear={false}
        />
      </div>
      <div className={s.button}>
        <Modal
          variant={'basic'}
          buttonText={'Добавить группу'}
          options={options}
        >
          <div>
            <DirectoryField
              type={2}
              placeholder={'Введите название группы'}
              size={'small'}
              fullWidth={true}
              onChange={onChangeName}
            />
            <DirectoryField
              type={fieldType.SELECT}
              size={'small'}
              options={options}
              onChange={onChangeCourse}
            />
            <Button onClick={addGroup}>
              {'Добавить'}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminPanelPageView;