"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({
            message: "Authorization tokens are missing"
        });
        return;
    }
    try {
        const decodedId = jsonwebtoken_1.default.verify(token, process.env.JWT_USER_PASSWORD);
        if (decodedId) {
            req.userId = decodedId.id;
        }
        // Call next() to continue to the next middleware/route handler
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
exports.userMiddleware = userMiddleware;
