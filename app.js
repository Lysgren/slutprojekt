require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

const DatabaseConnection = require('./database/mongo')
const Logger = require('./middleware/Logger')

const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes/routes')

app.use(express.json())
app.use(Logger)
app.use(routes)
app.use(errorHandler)

app.use((req, res) => {
  res.status(404).json({ message: '404: Page not Found' })
})

app.listen(PORT, async() => {
  await DatabaseConnection()
  console.log(`App is running on port ${PORT}`)
})