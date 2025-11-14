"use strict";

var env = {};
require("dotenv").config({
  processEnv: env
});
var jwt = require('jsonwebtoken');
function generateToken(decode) {
  var secretKey = env.KEY_LOGIN;
  if (!secretKey) {
    throw new Error('Secret key KEY_LOGIN is not defined in environment variables.');
  }
  return jwt.sign(decode, secretKey);
}
module.exports = {
  generateToken: generateToken
};