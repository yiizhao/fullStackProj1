const mongoose = require('mongoose');
const { Schema } = mongoose; //destructure

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0}
});

mongoose.model('users', userSchema);