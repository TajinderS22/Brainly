import jwt from "jsonwebtoken"
import { userModel } from "../db";
import { NextFunction, Request, Response } from "express";

interface AuthedRequest extends Request {
    userId?: string;
}


export const userMiddleware =  (req: AuthedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        res.status(401).json({
            message: "Authorization tokens are missing"
        });
        return 
    }

    try {
        const decodedId = jwt.verify(token, process.env.JWT_USER_PASSWORD as string) as any;
        if (decodedId) {
            req.userId = decodedId.id;
        }
        
        // Call next() to continue to the next middleware/route handler
        next();
        
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}