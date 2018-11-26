
const mongoose = require('mongoose')
const Joi = require('joi')


const genreSchema = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }  
}))


const validateGenre = (genre) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre,schema)
}

exports.genreSchema = genreSchema
exports.validate = validateGenre