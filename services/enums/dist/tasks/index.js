"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.fieldType = void 0;
exports.fieldType = {
    MULTI_ANSWER: 1,
    SINGLE_ANSWER: 2,
    RADIO: 3,
    TEXT_AREA: 4 //Задачи свободного ответа не подразумевающего готовый ответ
};
exports.action = {
    SEND: 1,
    SEND_TO_REVIEW: 2,
    REVIEW_APPROVE: 3,
    REVIEW_FAIL: 4 //Отказано на ревью
};
//# sourceMappingURL=index.js.map