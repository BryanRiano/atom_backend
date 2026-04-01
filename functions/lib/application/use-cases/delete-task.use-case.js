"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskUseCase = void 0;
const errors_1 = require("../../domain/errors");
class DeleteTaskUseCase {
    tasks;
    constructor(tasks) {
        this.tasks = tasks;
    }
    async execute(userId, taskId) {
        const ok = await this.tasks.delete(userId, taskId);
        if (!ok) {
            throw new errors_1.NotFoundError('Task');
        }
    }
}
exports.DeleteTaskUseCase = DeleteTaskUseCase;
//# sourceMappingURL=delete-task.use-case.js.map