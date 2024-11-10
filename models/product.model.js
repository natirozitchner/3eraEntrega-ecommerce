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
    required: true,
    minlength:6,
    maxlength: 120
},
category: {
    type: String,
    required: true
},
image: {
type: String,
required: true
} ,
createdAt: {type: Date, default: Date.now},
active: {type: Boolean, default: true},
updatedAt: {type: Date, default: Date.now}

})

module.exports = mongoose.model('Product', productSchema)