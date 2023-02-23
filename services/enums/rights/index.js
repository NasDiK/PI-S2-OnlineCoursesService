export const courses = {
  CREATE_COURSE: 1 << 0, //создать курс
  DELETE_COURSE: 1 << 1, //удалить курс
  UPDATE_COURSE: 1 << 2, // обновить курс

  ADD_PARTICIPANT: 1 << 3, //Добавить участника курса
  REMOVE_PARTICIPANT: 1 << 4, //Удалить участника с курса
  UPDATE_PARTICIPANT_ROLE: 1 << 5 //Изменять роль участника
};

export const users = {
  REGISTER_USER: 1 << 0, //Регистрация пользователей
  DELETE_USER: 1 << 1, //Удаление пользователей
  BLOCK_USER: 1 << 2, //Блокировка пользователей
  UPDATE_USER: 1 << 3, //Обновить информацию о пользователе
}