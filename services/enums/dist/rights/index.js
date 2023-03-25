"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groups = exports.reviews = exports.tasks = exports.users = exports.courses = void 0;
exports.courses = {
    CREATE_COURSE: 1 << 0,
    DELETE_COURSE: 1 << 1,
    UPDATE_COURSE: 1 << 2, // обновить курс
};
exports.users = {
    REGISTER_USER: 1 << 0,
    DELETE_USER: 1 << 1,
    BLOCK_USER: 1 << 2,
    UPDATE_USER: 1 << 3,
    ADD_USER_ROLE: 1 << 4 //Добавить роль пользователю
};
exports.tasks = {
    EXECUTE_TASK: 1 << 0 //Выполнение задачи
};
exports.reviews = {
    READ_ALL_DECISIONS: 1 << 0,
    READ_SUBORDINATE_DECISIONS: 1 << 1,
    RATE_SUBORDINATE_REVIEW: 1 << 2,
    RATE_ALL_REVIEWS: 1 << 3, // Оценивать любое ревью
};
exports.groups = {
    CREATE_GROUP: 1 << 0,
    EDIT_OWN_GROUP: 1 << 1,
    EDIT_ALL_GROUPS: 1 << 2,
    ADD_PARTICIPANT: 1 << 3,
    REMOVE_PARTICIPANT: 1 << 4,
    UPDATE_PARTICIPANT_ROLE: 1 << 5 //Изменять роль участника (isModerator)
};
//# sourceMappingURL=index.js.map