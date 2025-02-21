import bcrypt from 'bcrypt'
import { signUserToken } from "../utils/token.js";

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const registerUser = async (req, res) => {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
        return res.status(400).json({ error: "email, password and name are required" })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const newUser = await req.context.prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword
            }
        })
        const token = signUserToken(newUser.id)
        return res.json({ token: token })
    } catch (error) {
        console.error(error)
        return res.status(400).json({ 
            errorCode: 1,
            error: "User could not be created, User probably already exists",
        })
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "email, password are required to login" })
    }

    const user = await req.context.prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(401).json({ 
            errorCode: 1,
            error: `User is not found with that email: ${email}` }
        )
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.status(401).json({ 
            errorCode: 2,
            error: `Wrong password` 
        })
    }

    const token = signUserToken(user.id)
    return res.json({ token: token })
}