import express from 'express'
import { addContextToRequest } from './middleware/context.js'

const app = express()

app.use(addContextToRequest)
app.use(express.json())

app.get('/', (req, res) => {
    res.send("You found us.")
})

app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on: http://localhost:3001")
})

console.log("Setup")