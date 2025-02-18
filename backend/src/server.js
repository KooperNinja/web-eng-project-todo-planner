import express from 'express'
import { addContextToRequest } from './middleware/context.js'
import todoRoutes from './routes/todos.js'

const app = express()

// Middleware
app.use(addContextToRequest)
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send("You found us.")
})
app.use('/api/todos', todoRoutes)

// Start the Backend App
app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on: http://localhost:3001")
})