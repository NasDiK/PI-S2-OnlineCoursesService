/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Button} from '../../../shared';
import {useSelector} from 'react-redux';

export const ExportCSV = () => {
  const tasks = useSelector((stores: any) => stores.studentsStore.tasks);
  const users = useSelector((stores: any) => stores.studentsStore.users);
  const answers = useSelector((stores: any) => stores.studentsStore.answers);
  const fileName = useSelector((stores: any) => stores.studentsStore.groupName);
  const csvData2 = [{}];
  const firstStr = {students: ''};

  if (tasks !== undefined) {
    tasks.forEach((el) => {
      firstStr[el.title] = '';

      return el.title;
    });
    csvData2.push(firstStr);
  }

  if (users !== undefined && tasks !== undefined) {
    users.forEach((user) => {
      const str = {students: user.fullname};
      let completedTasks = 0;

      tasks.forEach((task) => {
        str[task.title] = '';

        if (answers !== undefined) {
          // eslint-disable-next-line max-nested-callbacks
          answers.forEach((answer) => {
            if (answer.user_id === user.id && answer.task_id === task.id) {
              let valueAnswer;

              if (answer.value === 'false') {
                valueAnswer = '0';
              } else if (answer.note !== null) {
                valueAnswer = answer.note;
              } else {
                valueAnswer = 'Сдано';
              }
              str[task.title] = valueAnswer;
              completedTasks++;
            }
            if (task.id === 999) {

              // eslint-disable-next-line no-console
              console.log(task.title);
              str[task.title] = `${completedTasks / (tasks.length - 1) * 100}%`;
            }
          });
        } else if (task.id === 999) {
          str[task.title] = `${completedTasks / (tasks.length - 1) * 100}%`;
        }
      });
      csvData2.push(str);
    });
  }

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToCSV = (dataToExport, fileNameToExport) => {
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const dataToEx = new Blob([excelBuffer], {type: fileType});

    FileSaver.saveAs(dataToEx, fileNameToExport + fileExtension);
  };

  return (
    <Button onClick={() => exportToCSV(csvData2, fileName)}>{'Экспорт в Эксель'}</Button>
  );
};