"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = toDate;
exports.userFromDoc = userFromDoc;
exports.taskFromDoc = taskFromDoc;
function toDate(value) {
    if (!value)
        return new Date(0);
    if (value instanceof Date)
        return value;
    return value.toDate();
}
function userFromDoc(id, data) {
    return {
        id,
        email: data.email,
        createdAt: toDate(data.createdAt),
    };
}
function taskFromDoc(id, data) {
    return {
        id,
        userId: data.userId,
        title: data.title,
        description: data.description ?? '',
        createdAt: toDate(data.createdAt),
        completed: Boolean(data.completed),
    };
}
//# sourceMappingURL=firestore-mappers.js.map