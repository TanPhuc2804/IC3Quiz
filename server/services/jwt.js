const env ={}
require("dotenv").config({processEnv:env})
const jwt = require('jsonwebtoken');

function generateToken(decode) {
    const secretKey = env.KEY_LOGIN;
    if (!secretKey) {
        throw new Error('Secret key KEY_LOGIN is not defined in environment variables.');
    }
    return jwt.sign(decode, secretKey);
}

module.exports = { generateToken };