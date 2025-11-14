"use strict";

var express = require('express');
var _require = require('../controllers/user'),
  getUserExamResults = _require.getUserExamResults,
  saveResultExam = _require.saveResultExam,
  getExamResultDetail = _require.getExamResultDetail,
  changeStatusUser = _require.changeStatusUser,
  getAllUsers = _require.getAllUsers,
  getExamResultDetailByUser = _require.getExamResultDetailByUser;
var _require2 = require('../midlewares/verify'),
  verifyLogin = _require2.verifyLogin,
  verifyAdmin = _require2.verifyAdmin;
var router = express.Router();

// Test API endpoint
router.get("/", verifyLogin, function (req, res) {
  res.status(200).json({
    user: req.user
  });
});
router.get("/all", verifyAdmin, getAllUsers);
router.get("/result", verifyLogin, getUserExamResults);
router.post("/save-result", verifyLogin, saveResultExam);
router.get("/result/:resultId", verifyLogin, getExamResultDetail);
router.get("/result-detail/:resultId", verifyLogin, getExamResultDetailByUser);
//admin
router.post("/change-status", verifyAdmin, changeStatusUser);
module.exports = router;