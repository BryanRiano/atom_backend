"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskUseCase = void 0;
const errors_1 = require("../../domain/errors");
class UpdateTaskUseCase {
    tasks;
    constructor(tasks) {
        this.tasks = tasks;
    }
    async execute(userId, taskId, input) {
        const updated = await this.tasks.update(userId, taskId, input);
        if (!updated) {
            throw new errors_1.NotFoundError('Task');
        }
        return updated;
    }
}
exports.UpdateTaskUseCase = UpdateTaskUseCase;
//# sourceMappingURL=update-task.use-case.js.map