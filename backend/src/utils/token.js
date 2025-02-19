import jwt from "jsonwebtoken";
import { secrets } from "../lib/env.js";

/**
 * 
 * @param {number} userId 
 */
export const signUserToken = (userId) => {
    return jwt.sign({ userId: userId }, secrets.JWT_SECRET, { expiresIn: "1h" })
}