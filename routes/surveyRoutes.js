const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const recipientSchema = require('../models/Recipient');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });
    //user login & credits
    app.post(
        '/api/surveys', 
        requireLogin, 
        requireCredits,
        async (req, res) => { //requireLogin run after the req
           const {title, subject, body, recipients} = req.body;

           const survey = new Survey(
               {
                title, 
                subject, 
                body, 
                recipients: recipients.split(',').map(email => ({ email: email.trim() }) ),
                _user: req.user.id,
                dateSent: Date.now()
               }
            );

            // send a email
            try {
                const mailer = new Mailer(survey, surveyTemplate(survey));
                await mailer.send();
                await survey.save();
                req.user.credits -= 1;
                const user = await req.user.save();
    
                res.send(user); //to reducer
            } catch (err) {
                res.status(422).send(err);
            }


        }  
    );
};
