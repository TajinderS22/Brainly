"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
// config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret =  JWT_USER_PASSWORD;
if (!jwtSecret) {
    throw new Error('❌ JWT_USER_PASSWORD is not set in your .env file');
}
// ✅ Tell TypeScript this is a guaranteed string now
exports.JWT_SECRET = jwtSecret;
