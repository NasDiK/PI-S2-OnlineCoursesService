import React, {useEffect, useState} from 'react';
import s from './AdminPanel.module.scss';
import {getAllCourses} from '../../../api/courses';
import {useSelector} from 'react-redux';
import {BigPanelSelector, DirectoryField, Button, Typography, Modal} from '../../shared';
import AddUserSelectComponent from './components/AddUserSelectComponent';
import {createGroup, getGroups} from '../../../api/groups';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';
import {fieldType, targetFields} from '@local/enums/shared';

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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [groupElement, setGroupElement] = useState<iElement>();
  let name, courseId;

  useEffect(() => {
    getAllCourses().then((x) => {
      setMainElement(x);
    });
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

  const options = mainElement?.map(({id, title}) => {
    // eslint-disable-next-line id-denylist
    return {label: title, value: id};
  });

  const onChangeName = (val) => {
    name = val;
  };

  const onChangeCourse = (val) => {
    courseId = val;
  };

  const addGroup = () => {
    createGroup(name, courseId);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const modalSetClose = () => {
    setModalIsOpen(false);
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
      <Button
        fullWidth={false}
        onClick={openModal}
      >
        {'Добавить группу'}
      </Button>
      <div className={s.button}>
        <Modal
          variant={'basic'}
          isOpen={modalIsOpen}
          onClose={modalSetClose}
        >
          <div className={s.modalContent}>
            <DirectoryField
              type={fieldType.TEXT}
              placeholder={'Введите название группы'}
              size={'medium'}
              fullWidth={true}
              onChange={onChangeName}
            />
            <div className={s.courseField}>
              <div className={s.text}>
                <Typography variant={'body16'}>{'Выберите курс:'}</Typography>
              </div>
              <DirectoryField
                type={fieldType.SELECT}
                size={'small'}
                options={options}
                onChange={onChangeCourse}
              />
            </div>
            <Button
              fullWidth={true}
              onClick={addGroup}
            >
              {'Добавить'}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminPanelPageView;