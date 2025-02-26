import { prisma } from '../lib/prisma.js'

/**
 *
 * @param {import('express').Request} req
 * @param {*} res
 * @param {import('express').NextFunction} next
 */
function addContextToRequest(req, res, next) {
	req.context = {
		prisma: prisma,
	}
	next()
}

export { addContextToRequest }
