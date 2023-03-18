import {iTask} from '../../../components/MainPage/Course/Components/Task';

const mockTask: iTask = {
  id: 1,
  title: 'Веселюся',
  description: 'Мы писали, мы писали, наши пальчики устали',
  'value': [
    {
      type: 2 //SINGLE_ANSWER
    }
  ]
};

const getTaskFromApi = () => mockTask;

export {
  getTaskFromApi
};