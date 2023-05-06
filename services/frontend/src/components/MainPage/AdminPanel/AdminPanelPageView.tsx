/* eslint-disable id-denylist */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import s from './AdminPanel.module.scss';
import {getAllCourses} from '../../../api/courses';
import {Provider} from 'react-redux';
import {BigPanelSelector, DirectoryField, Button, Typography, Modal, Tabs} from '../../shared';
import AddUserSelectComponent from './components/AddUserSelectComponent';
import {createGroup, getGroups} from '../../../api/groups';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';
import {fieldType, targetFields} from '@local/enums/shared';
import RolesComponent from './components/RolesComponent';
import {store as adminStore} from '../../../stores/components/AdminPanel/AdminReducer';
import {magic} from '../../../mobxUtils';
import PropTypes from 'prop-types';

const minimalElement: iElement = {
  id: -1,
  type: shared.targetFields.ELEMENT_GROUP,
  name: 'undefined'
};

const tabsEnum = {
  GROUP_CONTROL: 1, //Назначение груп
  ROLES_CONTROL: 2 //Назначение ролей
}; //очень нехорошо так делать, но при желании можно в енумы вынести

const tabs = [
  {
    value: tabsEnum.GROUP_CONTROL,
    label: 'Назначение групп'
  },
  {
    value: tabsEnum.ROLES_CONTROL,
    label: 'Назначение ролей'
  }
];

const AdminPanelPageView = ({UserStore}) => {
  const {userId} = UserStore;
  const [mainElement, setMainElement] = useState<any>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [groupElement, setGroupElement] = useState<iElement>();
  const [activeTab, setActiveTab] = useState<number>(tabs[0].value);
  let name: any, courseId: any;

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
    return {label: title, value: id};
  });

  const onChangeName = (val: any) => {
    name = val;
  };

  const onChangeCourse = (val: any) => {
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

  const renderGroupSelector = () => (
    <React.Fragment>
      <div className={s.groupsSelector}>
        <BigPanelSelector
          element={groupElement || minimalElement}
          renderableComponent={<AddUserSelectComponent />}
          elementLink={`/admin-panel/`}
          withLinear={false}
        />
        <Button
          fullWidth={false}
          onClick={openModal}
        >
          {'Добавить группу'}
        </Button>
      </div>
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
    </React.Fragment>
  );

  const renderRolesSelector = () => (
    <Provider store={adminStore}>
      <RolesComponent />
    </Provider>
  );

  const renderContent = () => {
    switch (activeTab) {
      case tabsEnum.ROLES_CONTROL:
        return renderRolesSelector();
      case tabsEnum.GROUP_CONTROL:
      default:
        return renderGroupSelector();
    }
  };

  return (
    <React.Fragment>
      <Tabs
        tabs={tabs}
        onChange={setActiveTab}
        value={activeTab}
      />
      <div className={s.content}>
        {activeTab && renderContent()}
      </div>
    </React.Fragment>
  );
};

AdminPanelPageView.propTypes = {
  UserStore: PropTypes.object
};

export default magic(AdminPanelPageView, {store: 'UserStore'});