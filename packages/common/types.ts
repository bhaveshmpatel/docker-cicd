import { password } from "bun";
import z, { boolean, string } from "zod";

export const SignupSchema = z.object({
    name: string(),
    email: string(),
    password: string()
})

export const SigninSchema = z.object({
    email: string(),
    password: string()
})

export const TodoSchema = z.object({
    task: string(),
    completed: boolean()
})