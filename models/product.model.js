const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 4,
    maxlength: 30
},
price: {
    type: Number,
    required: true
},
description: {
    type: String,
    required: true
},
category: {
    type: String,
    required: true
},
image: String,
createdAt: {type: Date, default: Date.now},
active: {type: Boolean, default: true},
updatedAt: {type: Date, default: Date.now}

})

module.exports = mongoose.model('Product', productSchema)