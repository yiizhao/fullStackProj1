module.exports = (req, res, next) => { //next = next module 
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!'});
    }

    next();
};