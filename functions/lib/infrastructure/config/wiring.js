"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWiring = getWiring;
const env_1 = require("./env");
const use_case_factory_1 = require("../../application/factories/use-case.factory");
const firestore_user_repository_1 = require("../persistence/firestore-user.repository");
const firestore_task_repository_1 = require("../persistence/firestore-task.repository");
const jwt_token_service_1 = require("../security/jwt-token.service");
let cached = null;
function getWiring() {
    if (cached)
        return cached;
    const tokens = new jwt_token_service_1.JwtTokenService((0, env_1.getJwtSecret)());
    const users = new firestore_user_repository_1.FirestoreUserRepository();
    const tasks = new firestore_task_repository_1.FirestoreTaskRepository();
    const factory = (0, use_case_factory_1.createUseCaseFactory)(users, tasks, tokens);
    cached = { factory, tokens };
    return cached;
}
//# sourceMappingURL=wiring.js.map