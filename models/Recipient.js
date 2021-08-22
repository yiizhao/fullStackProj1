const mongoose = require('mongoose');
const { Schema } = mongoose; //destructure

// prevent duplicate clicks using checked 

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false}
});

module.exports = recipientSchema;