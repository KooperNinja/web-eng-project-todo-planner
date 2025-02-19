import jwt from 'jsonwebtoken'
import { secrets } from '../lib/env.js';

/**
 * 
 * @param {import('express').Request} req 
 * @param {*} res 
 * @param {import('express').NextFunction} next 
 */
export const authenticate = (req, res, next) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        console.log(token)
        const verified = jwt.verify(token, secrets.JWT_SECRET);
        console.log(verified)
        /*
        req.context.user = req.context.prisma.user.findUnique({
            where: {
                id: Number(verified.userId)
            }
        })*/
        next();
      } catch (error) {
        console.error(error)
        res.status(400).json({ error: "Invalid token" });
      }
    
}