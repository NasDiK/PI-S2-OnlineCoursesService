import React, {useEffect, useState} from 'react';
import s from './AdminPanel.module.scss';
import Modal from '../../shared/Basic/Modal/Modal';
import {getAllCurses} from '../../../api/courses';
import {useSelector} from 'react-redux';
import {BigPanelSelector} from '../../shared';
import AddUserSelectComponent from './components/AddUserSelectComponent';
import {createGroup, getGroups} from '../../../api/groups';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';
import {fieldType, targetFields} from '@local/enums/shared';
import DirectoryField from '../../shared/Basic/DirectoryField/DirectoryField';
import Button from '../../shared/Basic/Button/Button';
import Typography from '../../shared/Basic/Typography/Typography';

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
  let name;
  let courseId;

  useEffect(() => {
    getAllCurses().then((x) => {
      setMainElement(x);
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
    createGroup(name, courseId);
  };

  const modalOpen = () => {
    setModalIsOpen(true);
  };

  const ModalSetClose = () => {
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
        onClick={modalOpen}
      >
        {'Добавить группу'}
      </Button>
      <div className={s.button}>
        <Modal
          variant={'basic'}
          buttonText={'Добавить группу'}
          options={options}
          isOpen={modalIsOpen}
          onClose={ModalSetClose}
        >
          <div className={s.modalContent}>
            <DirectoryField
              type={2}
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