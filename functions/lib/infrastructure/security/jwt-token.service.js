"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtTokenService {
    secret;
    constructor(secret) {
        this.secret = secret;
    }
    sign(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secret, { expiresIn: '7d' });
    }
    verify(token) {
        const decoded = jsonwebtoken_1.default.verify(token, this.secret);
        if (!decoded?.sub || !decoded?.email) {
            throw new Error('Invalid token payload');
        }
        return { sub: decoded.sub, email: decoded.email };
    }
}
exports.JwtTokenService = JwtTokenService;
//# sourceMappingURL=jwt-token.service.js.map