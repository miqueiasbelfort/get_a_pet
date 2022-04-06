const express = require('express')
const cors = require("cors")

const app = express()

app.use(express.json())

// solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public
app.use(express.static('public'))

// Routes
const userRoutes = require("./routes/userRoutes")
const petRoutes = require("./routes/petRoutes")

app.use("/users", userRoutes)
app.use("/pets", petRoutes)

app.listen(5000)