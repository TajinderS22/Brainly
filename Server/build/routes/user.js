"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const UserMiddleware_1 = require("../Middleware/UserMiddleware");
const utils_1 = require("../utils/utils");
const mongoose_1 = __importDefault(require("mongoose"));
exports.userRouter = (0, express_1.Router)();
const SaltRounds = 10;
const ObjectId = mongoose_1.default.Types.ObjectId;
const zodSchema = zod_1.z.object({
    userName: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    age: zod_1.z.string(),
    createdAt: zod_1.z.date()
});
exports.userRouter.get('/', (req, res) => {
    res.json({ message: "You are at the server " });
});
exports.userRouter.post("/signup", async (req, res) => {
    const data = req.body;
    const password = data.password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    const existingUser = await db_1.userModel.findOne({
        email: data.email
    });
    if (existingUser) {
        res.status(409).json({
            messsage: "User Already registered please Signin."
        });
        return;
    }
    if (!password || typeof password !== 'string' || !passwordRegex.test(password)) {
        res.status(400).json({
            message: "Password must be atleast 8 characters long and must include atlest 1 upppercase, 1 lowercase and 1 special character"
        });
        return;
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, SaltRounds);
        data.password = (hashedPassword);
        zodSchema.safeParse(data);
        await db_1.userModel.create(data);
        res.status(200).json({
            message: "User Registered Successfully."
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.userRouter.post('/signin', async (req, res) => {
    const data = req.body;
    try {
        const User = await db_1.userModel.findOne({
            email: data.email
        });
        if (!User) {
            res.status(404).json({
                message: "User not found Please Signup"
            });
            return;
        }
        const checkPassword = await bcrypt_1.default.compare(data.password, User.password);
        if (!checkPassword) {
            res.status(409).json({
                message: "Password is incorrect"
            });
            return;
        }
        if (User) {
            const token = jsonwebtoken_1.default.sign({ id: User._id }, config_1.JWT_SECRET, {
                expiresIn: '1w'
            });
            res.status(200).json({
                message: "User Signed in.",
                token: token
            });
        }
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.userRouter.post('/content', UserMiddleware_1.userMiddleware, async (req, res) => {
    const contentData = req.body;
    contentData.userId = req.userId;
    contentData.tags = contentData.tags.map((tag) => new ObjectId(tag));
    try {
        await db_1.contentModel.create(contentData);
        res.status(200).json({
            message: "content Cretaed"
        });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            message: "Internal server Error 500"
        });
    }
});
exports.userRouter.get('/content', UserMiddleware_1.userMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const Response = await db_1.contentModel.find({
            userId
        }).populate("userId", { userName: 1 });
        res.status(200).json({
            Response
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server Error 500."
        });
    }
});
exports.userRouter.delete('/content', UserMiddleware_1.userMiddleware, async (req, res) => {
    if (!req.userId || typeof req.userId !== 'string') {
        res.status(400).json({ message: "Invalid userId" });
        return;
    }
    const userId = ObjectId.createFromHexString(req.userId);
    const contentId = ObjectId.createFromHexString(req.body.contentId);
    try {
        await db_1.contentModel.deleteOne({
            _id: contentId,
            userId
        });
        res.status(200).json({
            message: "deleted the content"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.userRouter.post("/brain/share", UserMiddleware_1.userMiddleware, async (req, res) => {
    const share = req.body.share;
    const userId = req.userId;
    const hash = (0, utils_1.random)(10);
    try {
        if (share) {
            await db_1.linkModel.create({
                hash,
                userId
            });
            const shareableLink = `/brain/share/${hash}`;
            res.status(200).json({
                message: "you can now share your brain with given link.",
                link: shareableLink
            });
        }
        else {
            await db_1.linkModel.deleteOne({
                userId
            });
            res.status(200).json({
                message: "your Brain is now private.",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.userRouter.get("/brain/share", UserMiddleware_1.userMiddleware, async (req, res) => {
    const userId = req.userId;
    const response = await db_1.linkModel.findOne({
        userId
    });
    res.status(200).json({
        data: response
    });
});
exports.userRouter.get("/brain/share/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await db_1.linkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "your given input is not valid"
        });
        return;
    }
    const user = await db_1.userModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "User Does not exist"
        });
        return;
    }
    const content = await db_1.contentModel.find({
        userId: link.userId
    });
    const userName = user?.userName;
    res.json({
        message: "Fetched User brain",
        username: userName,
        content: content
    });
});
exports.userRouter.post('/tags', async (req, res) => {
    const { title, color } = req.body;
    const response = await db_1.tagsModel.create({
        title,
        color
    });
    res.json({
        response
    });
});
exports.userRouter.post('/authenticate-user', UserMiddleware_1.userMiddleware, async (req, res) => {
    const userId = req.userId;
    const response = await db_1.userModel.find({
        _id: userId
    });
    if (response) {
        res.status(200).json({
            user: response[0]
        });
    }
    else {
        res.status(401).json({
            message: "JWT token is invalid or expired "
        });
    }
});
exports.userRouter.get('/tags', async (req, res) => {
    const response = await db_1.tagsModel.find({});
    res.json({
        tags: response
    });
});
