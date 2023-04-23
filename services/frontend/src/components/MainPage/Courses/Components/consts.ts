import {fieldType} from '@local/enums/tasks';

export const creationTaskTypes = {
  SINGLE_ANSWER: {
    'value': fieldType.SINGLE_ANSWER,
    label: 'Задача строчного ответа'
  },
  MULTI_ANSWER: {
    'value': fieldType.MULTI_ANSWER,
    'label': 'Задача множественного выбора'
  },
  RADIO: {
    'value': fieldType.RADIO,
    label: 'Задача одиночного выбора'
  },
  TEXT_AREA: {
    'value': fieldType.TEXT_AREA,
    label: 'Задача свободного ответа'
  }
};