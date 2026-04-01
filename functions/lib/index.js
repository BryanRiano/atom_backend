"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const app_1 = require("firebase-admin/app");
const https_1 = require("firebase-functions/v2/https");
const v2_1 = require("firebase-functions/v2");
const create_app_1 = require("./infrastructure/http/create-app");
const wiring_1 = require("./infrastructure/config/wiring");
(0, app_1.initializeApp)();
(0, v2_1.setGlobalOptions)({ region: 'us-central1', maxInstances: 10 });
let expressApp = null;
function getExpressApp() {
    if (!expressApp) {
        const { factory, tokens } = (0, wiring_1.getWiring)();
        expressApp = (0, create_app_1.createApp)(factory, tokens);
    }
    return expressApp;
}
exports.api = (0, https_1.onRequest)((req, res) => {
    getExpressApp()(req, res);
});
//# sourceMappingURL=index.js.map