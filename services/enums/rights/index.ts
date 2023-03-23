export const courses = {
  CREATE_COURSE: 1 << 0, //создать курс
  DELETE_COURSE: 1 << 1, //удалить курс
  UPDATE_COURSE: 1 << 2, // обновить курс
};

export const users = {
  REGISTER_USER: 1 << 0, //Регистрация пользователей
  DELETE_USER: 1 << 1, //Удаление пользователей
  BLOCK_USER: 1 << 2, //Блокировка пользователей
  UPDATE_USER: 1 << 3, //Обновить информацию о пользователе
  ADD_USER_ROLE: 1 << 4 //Добавить роль пользователю
};

export const tasks = {
  EXECUTE_TASK: 1 << 0 //Выполнение задачи
};

export const reviews = {
  READ_ALL_DECISIONS: 1 << 0, //Просмотр всех решений
  READ_SUBORDINATE_DECISIONS: 1 << 1, //Просмотр решений своих подчиненых
  RATE_SUBORDINATE_REVIEW: 1 << 2, // Оценивать ревью свои подчиненных
  RATE_ALL_REVIEWS: 1 << 3, // Оценивать любое ревью
};

export const groups = {
  CREATE_GROUP: 1 << 0, //Создать группу
  EDIT_OWN_GROUP: 1 << 1, //Менять свою группу
  EDIT_ALL_GROUPS: 1 << 2, //Менять все группы

  ADD_PARTICIPANT: 1 << 3, //Добавить участника курса
  REMOVE_PARTICIPANT: 1 << 4, //Удалить участника с курса
  UPDATE_PARTICIPANT_ROLE: 1 << 5 //Изменять роль участника (isModerator)
};