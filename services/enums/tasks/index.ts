export const fieldType = {
  MULTI_ANSWER: 1,
  SINGLE_ANSWER: 2,
  RADIO: 3,
  TEXT_AREA: 4 //Задачи свободного ответа не подразумевающего готовый ответ
};

export const action = {
  SEND: 1, //Отправлена на автопроверку
  SEND_TO_REVIEW: 2, //Отправлена на ревью
  REVIEW_APPROVE: 3, //Одобрено ревью
  REVIEW_FAIL: 4 //Отказано на ревью
}