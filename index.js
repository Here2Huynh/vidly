
const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())


const genres = [
    { id: 1, name: 'horror'},
    { id: 2, name: 'comedy'},
    { id: 3, name: 'action'},
    { id: 4, name: 'romance'},
    { id: 5, name: 'anti-hero'},
]

// retrieve data all
app.get('/vidly.com/api/genres', (req , res) => {
    res.send(genres)
})

// retrieve selected id
app.get('/vidly.com/api/genres/:id', (req, res) => {
    const foundGenre = genres.find(g => g.id === parseInt(req.params.id))
    if ( !foundGenre ) return res.status(404).send('Genre with given ID is not found.')

    res.send(foundGenre)
})

// validate input with schema
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

// add data 
app.post('/vidly.com/api/genres', (req, res) => {
    const { error } = validateGenre(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)

    const newGenre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(newGenre)
    res.send(newGenre)
})

// update data
app.put('/vidly.com/api/genres/:id', (req,res) => {
    // find the genre, if not found return 404  
    const foundGenre = genres.find(g => g.id === parseInt(req.params.id))
    if ( !foundGenre ) return res.status(404).send('Genre with given ID is not found.')

    // validate the given data
    const { error } = validateGenre(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)

    // update and return the genre
    foundGenre.name = req.body.name
    res.send(foundGenre)
})

// delete data
app.delete('/vidly.com/api/genres/:id', (req, res) => {
    // find the genre, if not return 404
    const foundGenre = genres.find(g => g.id === parseInt(req.params.id))
    if ( !foundGenre ) return res.status(404).send('Genre with given ID is not found.')

    // delete and return the genre 
    const index = genres.indexOf(foundGenre)
    genres.splice(index,1)

    // return genre
    res.send(foundGenre)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port) ${port}`))