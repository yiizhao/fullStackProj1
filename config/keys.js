// keys.js - figrue out what set of credential to return
// node.env tells when heroku in deploy
if (process.env.NODE_ENV === 'production') {
// we are in production
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}