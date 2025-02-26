import dotenv from 'dotenv'

dotenv.config()

const { JWT_SECRET } = process.env

export const secrets = {
	JWT_SECRET: JWT_SECRET,
}
