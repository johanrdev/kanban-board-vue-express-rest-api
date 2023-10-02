const express = require('express')
const app = express()
const port = 3000
const db = require('./database')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./database/connect')(db)
require('./routes/todo.routes')(app)

app.listen(port, () => console.log(`Server is running on port: ${port}`))