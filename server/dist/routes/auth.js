"use strict";

var express = require('express');
var _require = require('../controllers/auth'),
  register = _require.register,
  login = _require.login;
var router = express.Router();

// Test API endpoint
router.post('/register', register);
router.post('/login', login);
router.get('/logout', function (req, res) {
  res.clearCookie('token').status(200).json({
    status: true
  });
});
module.exports = router;