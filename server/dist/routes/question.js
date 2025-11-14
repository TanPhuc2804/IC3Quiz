"use strict";

var express = require('express');
var _require = require('../controllers/question'),
  getAllQuestion = _require.getAllQuestion,
  getQuestionByExam = _require.getQuestionByExam,
  addQuestions = _require.addQuestions,
  addExam = _require.addExam,
  removeExam = _require.removeExam,
  createExamForRandomQuestions = _require.createExamForRandomQuestions;
var _require2 = require('../midlewares/verify'),
  verifyLogin = _require2.verifyLogin,
  verifyPackage = _require2.verifyPackage,
  verifyAdmin = _require2.verifyAdmin;
var router = express.Router();

// Test API endpoint

router.get("/", getAllQuestion);
router.get("/:examId", verifyLogin, verifyPackage, getQuestionByExam);
router.post("/addExam", verifyAdmin, addExam);
router.post("/removeExam", verifyAdmin, removeExam);
router.post("/create-exam", createExamForRandomQuestions);
router.post("/", verifyAdmin, addQuestions);
module.exports = router;