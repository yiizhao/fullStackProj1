const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post(
        '/api/stripe', 
        requireLogin, //when request come in, be called automatically
        async (req, res) => {
            if (!req.user) {
                return res.status(401).send({ error: 'You must log in!'});
            }
            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: '$5 for 500 credits',
                source: req.body.id
            });
            
            req.user.credits += 500;
            const user = await req.user.save(); //user = the most updated model
            res.send(user);
        }
        
    );

};