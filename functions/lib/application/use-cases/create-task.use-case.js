"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskUseCase = void 0;
class CreateTaskUseCase {
    tasks;
    constructor(tasks) {
        this.tasks = tasks;
    }
    execute(userId, title, description) {
        return this.tasks.create({ userId, title, description });
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
//# sourceMappingURL=create-task.use-case.js.map