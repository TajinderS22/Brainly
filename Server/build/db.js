"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagsModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    userName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    age: Number
}, { timestamps: true });
const contentTypes = ['youtube', 'document', "tweet", "image", "video", 'audio',];
const ContentSchema = new mongoose_2.Schema({
    type: { type: String, enum: contentTypes, required: true },
    link: String,
    title: String,
    text: String,
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tags' }]
}, { timestamps: true });
const TagsSchema = new mongoose_2.Schema({
    title: String,
    color: String,
}, { timestamps: true });
const LinkSchema = new mongoose_2.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
exports.userModel = mongoose_1.default.model('User', UserSchema);
exports.contentModel = mongoose_1.default.model('Content', ContentSchema);
exports.tagsModel = mongoose_1.default.model('Tags', TagsSchema);
exports.linkModel = mongoose_1.default.model('Link', LinkSchema);
