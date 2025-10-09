const express = require('express');
const { getAllQuestion,getQuestionByExam } = require('../controllers/question');
const { verifyLogin, verifyPackage } = require('../midlewares/verify');
const router = express.Router();

// Test API endpoint

router.get("/", getAllQuestion);
router.get("/:examId", verifyLogin, verifyPackage, getQuestionByExam);
module.exports = router;