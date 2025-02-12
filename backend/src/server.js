import express from 'express'
import { addContextToRequest } from './middleware/context.js'
import todoRoutes from './routes/todos.js'

const app = express()

app.use(addContextToRequest)
app.use(express.json())

app.get('/', (req, res) => {
    res.send("You found us.")
})

app.use('/api/todos', todoRoutes)

app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on: http://localhost:3001")
})

console.log("Setup")