import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { SigninSchema, SignupSchema, TodoSchema } from "common/types";
import { JWT_SECRET } from "common/config";
import { prismaClient } from "db/client";
import authMiddleware from "./middleware";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const parsedData = SignupSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    }

    const { name, email, password } = parsedData.data

    await prismaClient.user.create({
        data: {
            name,
            email,
            password
        }
    })

    res.json({
        message: "User created successfully"
    })
})

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    }

    const { email, password } = parsedData.data

    const user = await prismaClient.user.findFirst({
        where: {
            email
        }
    })

    if( password !== user?.password ) {
        res.status(411).json({
            message: "Incorrect password"
        })
        return;
    }

    console.log(JWT_SECRET);
    if(!JWT_SECRET) {
        res.status(411).json({
            message: "secret not found"
        })
        return;
    }
    
    const token = jwt.sign(user.id, JWT_SECRET);

    res.json({
        token
    })
})

app.post("/todo", authMiddleware, async (req, res) => {
    const parsedData = TodoSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    }

    const { task, completed } = parsedData.data;
    //@ts-ignore
    const userId = req.userId;

    await prismaClient.todo.create({
        data: {
            task,
            completed,
            userId
        }
    })
    res.json({
        message: "Todo created successfully"
    })
})

app.listen(3001)