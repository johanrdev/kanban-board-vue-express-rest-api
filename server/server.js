const express = require('express')
const app = express()
const port = 3000
const db = require('./database')
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

require('./database/connect')(db)
require('./routes/todo.routes')(app)

app.listen(port, () => console.log(`Server is running on port: ${port}`))