
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const genres = require('./routes/genres')
const customers = require('./routes/customers')

// mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch((err) => console.error('Could not connect to MongoDB...', err))

 
app.use(express.json())
// app.use('/vidly.com/api/genres', genres)
app.use('/vidly.com/api/customers', customers) 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))
