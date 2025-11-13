const { AppError } = require("../error")
const examModel = require("../model/exam")
const expressAsyncHandler = require("express-async-handler")
const getAllExam = expressAsyncHandler(async (req, res) => {
    const exams = await examModel.find({})
    if(!exams){
        throw new AppError("No exam found", 404)
    }
    res.json(exams)
})

const getById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const exam = await examModel.findById(id);
    if (!exam) {
        throw new AppError("Exam not found", 404);
    }
    res.json(exam);
});



module.exports = { getAllExam, getById }