"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtSecret = getJwtSecret;
exports.getCorsOrigins = getCorsOrigins;
function getJwtSecret() {
    const s = process.env.JWT_SECRET;
    if (s && s.length >= 16) {
        return s;
    }
    if (process.env.FUNCTIONS_EMULATOR === 'true') {
        return 'emulator-only-secret-min-16-chars';
    }
    throw new Error('JWT_SECRET must be set and at least 16 characters');
}
function getCorsOrigins() {
    const raw = process.env.CORS_ORIGINS || 'http://localhost:4200';
    return raw
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);
}
//# sourceMappingURL=env.js.map