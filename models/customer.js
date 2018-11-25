
const mongoose = require('mongoose')
const Joi = require('joi')

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => console.log('Connected to vidly.customer db...'))
    .catch(error => console.log('Cannot connect to vidly.customer db...', error ))



const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const validateCustomer = (genre) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(50).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(genre,schema)
}

exports.Customer = Customer
exports.validate = validateCustomer