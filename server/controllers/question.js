const { AppError } = require("../error")
const questionModel = require("../model/question")
const expressAsyncHandler = require("express-async-handler")
const getAllQuestion = expressAsyncHandler(async (req, res) => {
    const questions = await questionModel.find({})
    if (!questions) {
        throw new AppError("No question found", 404)
    }
    const cleanedQuestions = questions.map(q => {
        const obj = q.toObject(); 
        Object.keys(obj).forEach(key => {
            if (Array.isArray(obj[key]) && obj[key].length === 0) {
                delete obj[key];
            }
        })
        return obj;
    });

    res.json(cleanedQuestions)
})


const getQuestionByExam = expressAsyncHandler(async (req, res) => {
    const { examId } = req.params
    const questions = await questionModel.find({ exam_id: examId }).sort({question : 1})
    if (!questions) {
        throw new AppError("No question found for this exam", 404)
    }
    res.json(questions)
})

module.exports = { getAllQuestion, getQuestionByExam }