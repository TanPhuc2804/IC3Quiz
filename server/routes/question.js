const express = require('express');
const { getAllQuestion, getQuestionByExam, addQuestions, addExam, removeExam, createExamForRandomQuestions } = require('../controllers/question');
const { verifyLogin, verifyPackage, verifyAdmin } = require('../midlewares/verify');
const router = express.Router();

// Test API endpoint

router.get("/", getAllQuestion);
router.get("/:examId", verifyLogin, verifyPackage, getQuestionByExam);
router.post("/addExam", verifyAdmin, addExam);
router.post("/removeExam", verifyAdmin, removeExam);
router.post("/create-exam", createExamForRandomQuestions);
router.post("/", verifyAdmin, addQuestions);
module.exports = router;