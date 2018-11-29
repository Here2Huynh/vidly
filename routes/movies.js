
const mongoose = require('mongoose')
const Joi = required('joi')
const { Genre } = require('../models/genre')
const express = require('express')
const router = express.Router()


mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then((() => console.log('Connected to mongoDB...')))
    .catch(err => console.log('Fail to connect to mongoDB', err))


const movieSchema = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: Genre,
    numberInStock: { 
        type: Number
    },
    dailyRentalRate: {
        type: Number
    }
}))






const validateMovie = (movie) => {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    }
}       



