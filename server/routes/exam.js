const express = require('express');
const { getAllExam, getById } = require('../controllers/exam'); 
const router = express.Router();

// Test API endpoint

router.get("/", getAllExam);
router.get("/:id",getById)

module.exports = router;