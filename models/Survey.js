/*
we use survey not as a subdoc because of size limit of subdoc is 4 mb
*/

const mongoose = require('mongoose');
const { Schema } = mongoose; //destructure
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0},
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);

