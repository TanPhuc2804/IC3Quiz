"use strict";

var express = require('express');
var _require = require('../controllers/exam'),
  getAllExam = _require.getAllExam,
  getById = _require.getById;
var router = express.Router();

// Test API endpoint

router.get("/", getAllExam);
router.get("/:id", getById);
module.exports = router;