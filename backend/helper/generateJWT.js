require('dotenv').config();
const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_PRIVATE_KEY;

function generateAuthJWT(user) {
    var token = jwt.sign({userId: user._id}, privateKey);
    return token;
}

module.exports = generateAuthJWT;
