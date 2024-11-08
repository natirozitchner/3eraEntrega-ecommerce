const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
name: {
    type: String, 
    required: true, 
    minlength: 3,
    maxlength: 60
},
mail: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    maxlength:90,
    unique: true,
    index: true,
    validate: {
        validator: (value) => {
        const regex = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

        return regex.test(value)
        }
    }
    },
birthday: {
    type: String,
    required: true,
},
image: {
    type: String,
    required: true
},
password: {
    type: String, 
    required: true,
    minlength:4,
    maxlength:70,
    trim: true
},
province: {
    type: String,
    required: true,
    minlength: 3,
    maxlength:100
},
role: {
    type: String,
    default: "client",
    enum: ["client", "user", "admin", "superadmin"]
},
createdAt: {
    type: Date,
    default: Date.now
}
});


module.exports = mongoose.model("User", userSchema )