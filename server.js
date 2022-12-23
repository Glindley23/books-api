const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const booksRoutes = require('./controllers/books')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use('/books', booksRoutes)
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello World")
})

// database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT

app.listen(PORT, console.log(`listening on port ${PORT}`))
app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})
module.exports = app;