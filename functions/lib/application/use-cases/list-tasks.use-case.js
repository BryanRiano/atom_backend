"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTasksUseCase = void 0;
class ListTasksUseCase {
    tasks;
    constructor(tasks) {
        this.tasks = tasks;
    }
    execute(userId) {
        return this.tasks.findByUserIdOrdered(userId);
    }
}
exports.ListTasksUseCase = ListTasksUseCase;
//# sourceMappingURL=list-tasks.use-case.js.map