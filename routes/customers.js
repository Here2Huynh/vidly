
const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const router = express.Router();


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

const Customer = mongoose.model('Customer', customerSchema)


router.get('/', async(req, res) => {
    const customer = await Customer.find().sort('name')
    res.send(customer)
})

router.get('/:id', async(req,res) => {
    // find match
    const foundCustomer = await Customer.findById(req.params.id)
    if ( !foundCustomer ) return res.status(404).send('Customer not found.')
    // send match 
    res.send(foundCustomer)
})

router.post('/', async(req,res) => {
    const { error } = validateCustomer(req.body)
    if ( error ) return res.status(400).send(error.details[0].message)

    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    customer = await customer.save()

    res.send(customer)
})

router.put('/:id', async(req, res) => {
    // validate
    const { error } = validateCustomer(req.body)
    if ( error ) return res.status(400).send(error.details.message)

    // find match
    const updatedCustomer = await Customer.findOneAndUpdate(req.params.id, 
        { 
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, { new: true }) // the new prop is for mongoose to know and display it
    if (!updatedCustomer) return res.status(404).send('Customer not found.')

    // update
    res.send(updatedCustomer)
})

router.delete('/:id', async(req, res) => {
    // find match 
    const deletedCustomer  = await Customer.findOneAndDelete(req.params.id)
    if ( !deletedCustomer ) return res.status(404).send('Customer not found.')
    // delete
    res.send(deletedCustomer)
})

const validateCustomer = (genre) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(50).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(genre,schema)
}

module.exports = router; 