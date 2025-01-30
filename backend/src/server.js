import express from 'express'

const app = express()

app.get("/", (req, res) => {
    res.send("You get him now")
})

app.listen(3001, '0.0.0.0', () => {
    console.log("Server running on 3001")
})

console.log("Setup")