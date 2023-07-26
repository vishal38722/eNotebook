const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },

    password : {
        type : String,
        required : true,
        trim : true
    },

    date : {
        type : Date,
        default : Date.now
    }
})

const User = mongoose.model('user', UserSchema);
// User.createIndexes();
module.exports = User;