
const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const router = express.Router()



const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }  
}))

// get all data
router.get('/', async (req ,res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

// get one specificed data
router.get('/:id', async (req,res) => {
    const foundGenre = await Genre.findById(req.params.id)
    // const foundGenre = genres.find(g => g.id === parseInt(req.params.id))
    if ( !foundGenre ) return res.status(404).send('Genre not found.')
    res.send(foundGenre)
})

// update data, put
router.put('/:id', async (req,res) => {
    // validate the data
    const { error } = validateGenre(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)

    const foundGenre = await Genre.findOneAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    // find the genre, or return 404
    // const foundGenre = genres.find(g => g.id === parseInt(req.params.id))
    if ( !foundGenre ) return res.status(404).send('Genre not found.')


    // update the genre if found and return the updated genre
    // foundGenre.genre = req.body.genre
    res.send(foundGenre)
})

// create data post 
router.post('/', async (req,res) => {
    // validate input of req.body
    const { error } = validateGenre(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)

    // update the data
    let newGenre = new Genre({ name: req.body.name })

    // return the added genre
    newGenre = await newGenre.save()
    res.send(newGenre)
})

// delete data 
router.delete('/:id', async (req,res) => {
    const foundGenre = await Genre.findByIdAndRemove(req.params.id)

    // find the genre
    // const foundGenre = genres.find(g => g.id === parseInt(req.params.id))
    if ( !foundGenre ) return res.status(404).send('Genre not found.')

    // delete the genre
    // const index = genres.indexOf(foundGenre)
    // genres.splice(index,1)

    // return deleted genre
    res.send(foundGenre)
})

const validateGenre = (genre) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre,schema)
}

module.exports = router;