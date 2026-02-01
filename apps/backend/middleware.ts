import { JWT_SECRET } from "common/config";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(req: Request, res: Response, next:NextFunction) {
    const token = req.headers.authorization;

    if(!token) {
        res.status(411).json({
            message: "token unavailable"
        })
        return;
    }

    const verified = jwt.verify(token, JWT_SECRET);

    if(verified) {
        //@ts-ignore
        req.userId = verified.id;
        next();
    }

    res.status(411).json({
        message: "Unauthorized User"
    })
    return;

    
}