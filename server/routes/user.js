const express = require('express');
const {getUserExamResults,saveResultExam,getExamResultDetail } = require('../controllers/user'); 
const {verifyLogin} = require('../midlewares/verify');
const router = express.Router();

// Test API endpoint
router.get("/",verifyLogin,(req,res)=>{
    res.status(200).json({user:req.user})
})
router.get("/result",verifyLogin,getUserExamResults)
router.post("/save-result",verifyLogin,saveResultExam)
router.get("/result/:resultId",verifyLogin,getExamResultDetail)
module.exports = router;