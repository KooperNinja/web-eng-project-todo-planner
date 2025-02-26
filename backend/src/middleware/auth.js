import jwt from 'jsonwebtoken'
import { secrets } from '../lib/env.js'

/**
 *
 * @param {import('express').Request} req
 * @param {*} res
 * @param {import('express').NextFunction} next
 */
export const authenticate = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) return res.status(401).json({ error: 'Access denied' })
	try {
		const verified = jwt.verify(token, secrets.JWT_SECRET)
		if (typeof verified === 'string') {
			console.error('Token has no Payload', verified)
			return
		}
		req.context.user = await req.context.prisma.user.findUnique({
			where: {
				id: Number(verified.userId),
			},
		})
		next()
	} catch (error) {
		console.error(error)
		res.status(401).json({ error: 'Invalid token' })
	}
}
