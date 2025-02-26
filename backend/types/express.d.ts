import { Prisma, PrismaClient, type User } from '@prisma/client'
import 'express'

export interface Context {
	prisma: PrismaClient<Prisma.PrismaClientOptions, never, any>
	user?: User
}

declare global {
	namespace Express {
		export interface Request {
			context: Context
		}
	}
}
