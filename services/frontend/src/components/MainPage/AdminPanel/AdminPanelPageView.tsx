import React, {useEffect, useState} from 'react';
import s from './AdminPanel.module.scss';
import Modal from '../../shared/Basic/Modal/Modal';
import {getCoursesList} from '../../../api/courses';
import {useSelector} from 'react-redux';
import {BigPanelSelector} from '../../shared';
import {getUsersByRole} from '../../../api/users';
import AddUserSelectComponent from './components/AddUserSelectComponent';
import {getGroups} from '../../../api/groups';
//import {searchTasks, tasksFieldsNamesEnum} from '@api/tasks';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';
import {targetFields} from '@local/enums/shared';

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

  useEffect(() => {
    getCoursesList([userId]).then((x) => {
      setMainElement(x);
    });
    getUsersByRole(12).then((x) => {
      setUsers(x);
    });
    getGroups().then(({groups}) => {
      setGroupElement({id: groups[0].id,
        name: 'Выберите группу',
        type: targetFields.ELEMENT_GROUP,
        subGroup: [{id: groups[1].id,
          name: 'MOCK_COURSE_NAME',
          type: targetFields.ELEMENT}]});
      // eslint-disable-next-line no-console
      console.log(groupElement);
    });
  }, [userId]);

  /*useEffect(() => {
    searchTasks({
      coursesIds: [Number(courseId)],
      fields: [
        tasksFieldsNamesEnum.ID,
        tasksFieldsNamesEnum.TITLE,
        tasksFieldsNamesEnum.WEIGHT,
        tasksFieldsNamesEnum.COURSE_ID,
        tasksFieldsNamesEnum.MAX_NOTE
      ]
    }).then((x) => {
      const {tasks} = x;
      const groupedElement = groupTasksForSidebar(tasks);

      setMainElement(groupedElement);
    });
  }, []);*/

  const options = mainElement?.courses.map((el) => {
    // eslint-disable-next-line id-denylist
    return {label: el.title, value: el.id};
  });

  return (
    <div>
      <div className={s.groupsSelector}>
        <BigPanelSelector
          element={groupElement || minimalElement}
          renderableComponent={
            <AddUserSelectComponent />
          }
          elementLink={`/admin-panel/`}
          withLinear={false}
        />
      </div>
      <div className={s.button}>
        <Modal variant={'basic'} buttonText={'Добавить группу'} options={options} />
      </div>
    </div>
  );
};

export default AdminPanelPageView;