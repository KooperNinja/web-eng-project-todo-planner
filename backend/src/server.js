import express from 'express'
import { addContextToRequest } from './middleware/context.js'

const app = express()
// context might not be parsed
app.use(addContextToRequest)

app.get("/", (req, res) => {
    res.send({
        todoCount: req.context.prisma.todo.count()
    })
})


app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on 3001")
})

console.log("Setup")