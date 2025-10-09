const express = require('express');
const {getAllPackage} = require('../controllers/package'); 
const router = express.Router();


router.get("/", getAllPackage); 
module.exports = router;