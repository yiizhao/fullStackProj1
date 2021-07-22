//only common js modules supported, Node not support ES 2015
const express = require('express');
const app = express(); // generate a running Express app, set up configuration, route requests

//call get to generate a route handler
app.get('/', (req, res) => {
    res.send({hi: 'there'});
});


const PORT  = process.env.PORT || 5000; //heroku gives or the default port
//Express tell Node to listen to port
app.listen(PORT);