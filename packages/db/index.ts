import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

export const prismaClient = new PrismaClient({ adapter })