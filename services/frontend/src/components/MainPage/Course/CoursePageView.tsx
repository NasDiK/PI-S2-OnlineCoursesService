import React, {useEffect, useState} from 'react';
import {BigPanelSelector} from '../../shared';
import {iElement} from '../../shared/BigPanelSelector/Components/ColumnElement';
import {shared} from '@local/enums';
import Task from './Components/Task';
import {useMatches} from 'react-router';
import {searchTasks, tasksFieldsNamesEnum} from '../../../api/tasks';
import {groupTasksForSidebar} from './Components/Methods/TaskMethods';

const minimalElement: iElement = {
  id: -1,
  type: shared.targetFields.ELEMENT_GROUP,
  name: 'undefined'
};

const CoursePageView = () => {
  const [mainElement, setMainElement] = useState<iElement>();
  const [match] = useMatches();
  const {courseId} = match.params;

  useEffect(() => {
    searchTasks({
      coursesIds: [Number(courseId)],
      fields: [
        tasksFieldsNamesEnum.ID,
        tasksFieldsNamesEnum.TITLE,
        tasksFieldsNamesEnum.WEIGHT,
        tasksFieldsNamesEnum.COURSE_ID,
        tasksFieldsNamesEnum.MAX_NOTE,

        'courses.title as course_title'
      ],
      appends: [['courses', 'id', 'tasks', 'course_id']]
    }).then((x) => {
      const {tasks} = x;
      const groupedElement = groupTasksForSidebar(tasks);

      setMainElement(groupedElement);
    });
  }, []);

  return (
    <BigPanelSelector
      element={mainElement || minimalElement}
      renderableComponent={<Task />}
      elementLink={`/course/${courseId}/`}
      withLinear={true}
    />
  );
};

export default CoursePageView;