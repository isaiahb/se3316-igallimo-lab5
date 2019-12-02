const User = require('../models/user');
const jwt = require('jsonwebtoken');

//load env variables
require('dotenv').config();
const privateKey = process.env.JWT_PRIVATE_KEY;

async function getUser(id) {
     var user = await User.findById(id);
     return user;
}


async function auth(req, res, next) {

    //try to get auth jwt from cookies and load user
    try {
        var decoded = jwt.verify(req.cookies["auth"], privateKey);
        req.user = await getUser(decoded.userId);
        return next(); 
    } catch(e) {
        
        //unauthorized
        return res.status(401).send("unauthorized. must login"); 
    }
}

module.exports = auth;