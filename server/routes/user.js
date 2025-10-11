const express = require('express');
const {getUserExamResults,saveResultExam,getExamResultDetail,changeStatusUser } = require('../controllers/user'); 
const {verifyLogin, verifyAdmin} = require('../midlewares/verify');
const router = express.Router();

// Test API endpoint
router.get("/",verifyLogin,(req,res)=>{
    res.status(200).json({user:req.user})
})
router.get("/result",verifyLogin,getUserExamResults)
router.post("/save-result",verifyLogin,saveResultExam)
router.get("/result/:resultId",verifyLogin,getExamResultDetail)

//admin
router.post("/change-status",verifyAdmin,changeStatusUser)
module.exports = router;