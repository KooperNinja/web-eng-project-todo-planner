import express from 'express'
import { addContextToRequest } from './middleware/context.js'
import todoRouter from './routes/todoRouter.js'
import authRouter from './routes/authRouter.js'

const app = express()

// Middleware
app.use(addContextToRequest)
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send("You found us.")
})
app.use('/api/todos', todoRouter)
app.use('/api/auth', authRouter)

// Start the Backend App
app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on: http://localhost:3001")
})