const express = require('express');
const {getUserExamResults,saveResultExam,getExamResultDetail,changeStatusUser, getAllUsers, getExamResultDetailByUser } = require('../controllers/user'); 
const {verifyLogin, verifyAdmin} = require('../midlewares/verify');
const router = express.Router();

// Test API endpoint
router.get("/",verifyLogin,(req,res)=>{
    res.status(200).json({user:req.user})
})
router.get("/all",verifyAdmin,getAllUsers)

router.get("/result",verifyLogin,getUserExamResults)
router.post("/save-result",verifyLogin,saveResultExam)
router.get("/result/:resultId",verifyLogin,getExamResultDetail)
router.get("/result-detail/:resultId",verifyLogin,getExamResultDetailByUser)
//admin
router.post("/change-status",verifyAdmin,changeStatusUser)
module.exports = router;