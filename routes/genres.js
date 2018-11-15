
const express = require('express')
const router = express.Router()


let genres = [
    { id: 1, genre: 'comedy' },
    { id: 2, genre: 'action' },
    { id: 3, genre: 'mystery' },
    { id: 4, genre: 'fantasy' },
    { id: 5, genre: 'horror' },
]

// get all data
router.get('/', (req ,res) => {
    res.send(genres)
})

// get one specificed data
router.get('/:id', (req,res) => {
    const foundGenre = genres.find(g => g.id === parseInt(req.params.id))
    if ( !foundGenre ) return res.status(404).send('Genre not found.')
    res.send(foundGenre)
})

// update data, put
router.put('/:id', (req,res) => {
    // find the genre, or return 404
    const foundGenre = genres.find(g => g.id === parseInt(req.params.id))
    if ( !foundGenre ) return res.status(404).send('Genre not found.')

    // validate the data
    const { error } = validateGenre(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)

    // update the genre if found and return the updated genre
    foundGenre.genre = req.body.genre
    res.send(foundGenre)
})

// create data post 
router.post('/', (req,res) => {
    // validate input of req.body
    const { error } = validateGenre(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)

    // update the data
    const newGenre = {
        id: genres.length + 1,
        genre: req.body.genre
    }

    // return the added genre
    genres.push(newGenre)
    res.send(newGenre)
})

// delete data 
router.delete('/:id', (req,res) => {
    // find the genre
    const foundGenre = genres.find(g => g.id === parseInt(req.params.id))
    if ( !foundGenre ) return res.status(404).send('Genre not found.')

    // delete the genre
    const index = genres.indexOf(foundGenre)
    genres.splice(index,1)

    // return deleted genre
    res.send(foundGenre)
})

const validateGenre = (genre) => {
    const schema = {
        genre: Joi.string().min(3).required()
    }
    return Joi.validate(genre,schema)
}

module.exports = router;