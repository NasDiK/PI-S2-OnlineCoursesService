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
  const firstStr = {students: undefined};
  const csvData2 = [{}];
  const tasksTitlesArray:any = [];
  const answersArray:any = [];

  if (answers !== undefined) {
    // eslint-disable-next-line no-return-assign,array-callback-return
    answers.map((el) => {
      answersArray.push(el.value);
    });
  }
  // eslint-disable-next-line no-console
  console.log(answersArray);
  if (tasks !== undefined) {
    // eslint-disable-next-line no-return-assign,array-callback-return
    tasks.map((el) => {
      tasksTitlesArray.push(el.title);
      firstStr[el.title] = undefined;
    });
    csvData2.pop();
    csvData2.push(firstStr);
  }
  if (users !== undefined) {
    // eslint-disable-next-line no-return-assign,array-callback-return
    users.map((el) => {
      // eslint-disable-next-line no-console
      const obj = {
        students: el.fullname
      };

      for (let j = 0; j < tasksTitlesArray * 4; j += 4) {
        for (let i = 0; i < tasksTitlesArray.length; i++) {
          // eslint-disable-next-line no-console
          console.log(i + j);
          obj[tasksTitlesArray[i]] = answersArray[i + j];
        }
      }
      // eslint-disable-next-line no-console
      console.log(firstStr);
      csvData2.push(obj);
    });
  }
  // eslint-disable-next-line no-console
  console.log(csvData2);
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToCSV = (dataToExport, fileNameToEx) => {
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const dataToEx = new Blob([excelBuffer], {type: fileType});

    FileSaver.saveAs(dataToEx, fileNameToEx + fileExtension);
  };

  return (
    <Button onClick={() => exportToCSV(csvData2, fileName)}>{'Экспорт в Эксель'}</Button>
  );
};