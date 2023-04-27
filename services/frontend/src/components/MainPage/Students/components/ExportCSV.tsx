/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Button} from '../../../shared';
import {useSelector} from 'react-redux';

const exportToExcel = (tasks, users, answers, fileName) => {
  const csvData2 = [{}];
  const firstStr = {students: ''};

  if (tasks) {
    tasks.forEach((el) => {
      firstStr[el.title] = '';

      return el.title;
    });
    csvData2.push(firstStr);
  }

  if (users && tasks) {
    users.forEach((user) => {
      const str = {students: user.fullname};

      tasks.forEach((task) => {
        if (answers !== undefined) {
          // eslint-disable-next-line max-nested-callbacks
          answers.filter((answer) => answer.user_id === user.id && answer.task_id === task.id)
            // eslint-disable-next-line max-nested-callbacks
            .forEach((answer) => {
              str[task.title] = answer.value;
            });
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

  exportToCSV(csvData2, fileName);
};

export const ExportCSV = () => {
  const tasks = useSelector((stores: any) => stores.studentsStore.tasks);
  const users = useSelector((stores: any) => stores.studentsStore.users);
  const answers = useSelector((stores: any) => stores.studentsStore.answers);
  const fileName = useSelector((stores: any) => stores.studentsStore.groupName);
  const exportClick = () => exportToExcel(tasks, users, answers, fileName);

  return (
    <Button onClick={exportClick}>{'Экспорт в Эксель'}</Button>
  );
};