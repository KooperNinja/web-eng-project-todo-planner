import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * 
 * @param {import('express').Request} req 
 * @param {*} res 
 * @param {import('express').NextFunction} next 
 */
function addContextToRequest(req, res, next) {
    req.context = {
        prisma: prisma
    }
    next()
}

export { addContextToRequest }