const express = require('express');
const { register, login } = require('../controllers/auth');
const router = express.Router();

// Test API endpoint
router.post('/register', register)
router.post('/login', login)
router.get('/logout', (req, res) => {
    res.clearCookie('token').status(200).json({ status: true });
});
module.exports = router;