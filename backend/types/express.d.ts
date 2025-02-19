import { Prisma, PrismaClient } from "@prisma/client";
import 'express';

export interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, any>
    user?: any
}

declare global {
    namespace Express {
        export interface Request {
            context?: Context
        }
    }
}

