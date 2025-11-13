const { AppError } = require("../error")
const userModel = require("../model/user")
const examResult = require("../model/examResult")
const expressAsyncHandler = require("express-async-handler")


const getUserExamResults = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id
    const results = await examResult.find({ user_id: userId })
    if (!results) {
        throw new AppError("No exam results found for this user", 404);
    }
    res.json(results);
});

const getExamResultDetailByUser = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id
    const { resultId } = req.params;
    const result = await examResult.find({ exam: resultId, user_id: userId });
    if (!result) {
        throw new AppError("Exam result not found", 404);
    }
    res.json(result);
});

const saveResultExam = expressAsyncHandler(async (req, res) => {
    const idUser = req.user.id
    const { exam, result_detail } = req.body
    if (!exam || !result_detail) {
        throw new AppError("Missing required fields", 400);
    }

    const examResultData = new examResult({
        ...req.body,
        user_id: idUser
    });
    const examResultSaved = await examResultData.save();
    res.status(201).json(examResultSaved);
})

const getExamResultDetail = expressAsyncHandler(async (req, res) => {
    const { resultId } = req.params;
    const result = await examResult.findById(resultId)
    if (!result) {
        throw new AppError("Exam result not found", 404);
    }
    res.json(result);
});


const changeStatusUser = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body
    const status = "active"
    const updateUser = await userModel.findByIdAndUpdate(userId, {
        $set: { status: status },
    }, { new: true })
    await updateUser.save()
    res.status(201).json({ message: "Phê duyệt thành công !" })
})

const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await userModel.find({}).populate("package.package_id")
    res.status(200).json({ users })
});

module.exports = { getUserExamResults, saveResultExam, getExamResultDetail, changeStatusUser, getAllUsers,getExamResultDetailByUser }