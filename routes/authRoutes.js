const passport = require('passport'); //this passport is module

module.exports = (app) => {
    app.get(
        '/auth/google/', 
        passport.authenticate('google', {
            scope: ['profile', 'email'] //ask for info of the user account
        })
    );
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys'); 
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout(); // let passport do the log out
        res.redirect('/');
    });

    app.get(
        '/api/current_user', 
        (req, res) => {
            res.send(req.user);
        }
    )
}
