module.exports = (req, res, next) => { //next = next module 
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits'});
    }

    next();
};