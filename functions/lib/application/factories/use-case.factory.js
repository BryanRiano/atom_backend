"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseCaseFactory = createUseCaseFactory;
const lookup_user_by_email_use_case_1 = require("../use-cases/lookup-user-by-email.use-case");
const create_user_use_case_1 = require("../use-cases/create-user.use-case");
const login_user_use_case_1 = require("../use-cases/login-user.use-case");
const list_tasks_use_case_1 = require("../use-cases/list-tasks.use-case");
const create_task_use_case_1 = require("../use-cases/create-task.use-case");
const update_task_use_case_1 = require("../use-cases/update-task.use-case");
const delete_task_use_case_1 = require("../use-cases/delete-task.use-case");
function createUseCaseFactory(users, tasks, tokens) {
    return {
        lookupUserByEmail: new lookup_user_by_email_use_case_1.LookupUserByEmailUseCase(users),
        createUser: new create_user_use_case_1.CreateUserUseCase(users, tokens),
        loginUser: new login_user_use_case_1.LoginUserUseCase(users, tokens),
        listTasks: new list_tasks_use_case_1.ListTasksUseCase(tasks),
        createTask: new create_task_use_case_1.CreateTaskUseCase(tasks),
        updateTask: new update_task_use_case_1.UpdateTaskUseCase(tasks),
        deleteTask: new delete_task_use_case_1.DeleteTaskUseCase(tasks),
    };
}
//# sourceMappingURL=use-case.factory.js.map