const mongoose = require('mongoose');
const { Schema } = mongoose; //destructure

const userSchema = new Schema({
    googleId: String

});

mongoose.model('users', userSchema);