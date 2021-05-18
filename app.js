require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const PORT = process.env.PORT || 8000

const DatabaseConnection = require('./database/mongo')
const Logger = require('./middleware/Logger')
const fourZeroFour = require('./middleware/404')

const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes/routes')

app.use(fileUpload({ createParentPath: true }))
app.use(express.json())
app.use(Logger)
app.use(routes)
app.use(errorHandler)
app.use(fourZeroFour)

app.listen(PORT, async() => {
  await DatabaseConnection()
  console.log(`App is running on port ${PORT}`)
})