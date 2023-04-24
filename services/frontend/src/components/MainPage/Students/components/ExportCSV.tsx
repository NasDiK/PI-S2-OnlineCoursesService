import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Button} from '../../../shared';

interface IProps{
  // eslint-disable-next-line
  csvData: any,
  fileName: string
}
export const ExportCSV = (props: IProps) => {
  const {csvData, fileName} = props;
  const {tasks, users, answers} = csvData;
  const csvData2 = [{}];
  const firstStr = {students: ''};

  if (tasks !== undefined) {
    tasks.map((el) => {
      firstStr[el.title] = '';

      return el.title;
    });
    csvData2.push(firstStr);
  }

  if (users !== undefined && tasks !== undefined && answers !== undefined) {
    // eslint-disable-next-line array-callback-return
    users.map((user) => {
      const str = {students: user.fullname};
      let completedTasks = 0;

      // eslint-disable-next-line array-callback-return
      tasks.map((task) => {
        str[task.title] = '';
        // eslint-disable-next-line max-nested-callbacks,array-callback-return
        answers.map((answer) => {

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
            str[task.title] = `${completedTasks / (tasks.length - 1) * 100}%`;
          }
        });
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