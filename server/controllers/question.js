const { AppError } = require("../error")
const exam = require("../model/exam")
const questionModel = require("../model/question")
const expressAsyncHandler = require("express-async-handler")
const getAllQuestion = expressAsyncHandler(async (req, res) => {
    const questions = await questionModel.find({}).populate("exam_id")
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
    const questions = await questionModel.find({ exam_id: examId }).sort({ question: 1 })
    if (!questions) {
        throw new AppError("No question found for this exam", 404)
    }
    const length = questions.length
    questions.forEach((question, index) => {
        question.question = index + 1;
    })

    res.json(questions)
})

const addQuestions = expressAsyncHandler(async (req, res) => {
    const { questions } = req.body
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
        throw new AppError("Questions are required and should be a non-empty array", 400)
    }
    const counter = await questionModel.countDocuments()
    questions.forEach((question, index) => {
        question.id = counter + index + 1;
    })
    const createdQuestions = await questionModel.insertMany(questions)
    res.status(201).json({ questions: createdQuestions })
})

const addExam = expressAsyncHandler(async (req, res) => {
    const { examIds, questionId } = req.body
    if (!examIds) {
        throw new AppError("Exam ID is required", 400)
    }
    await questionModel.updateOne({
        _id: questionId
    }, {
        $addToSet: { exam_id: { $each: examIds } }
    })
    const question = await questionModel.findById(questionId).populate("exam_id")
    res.status(201).json({ question })
})
const removeExam = expressAsyncHandler(async (req, res) => {
    const { examId, questionId } = req.body
    if (!examId) {
        throw new AppError("Exam ID is required", 400)
    }
    await questionModel.updateOne({
        _id: questionId
    }, {
        $pull: { exam_id: examId }
    })
    const question = await questionModel.findById(questionId).populate("exam_id")
    res.status(200).json({ question })
})


const createExamForRandomQuestions = expressAsyncHandler(async (req, res) => {
    const { total_question, require_questions, description, content, image_url, duration } = req.body
    if (!require_questions || !Array.isArray(require_questions) || require_questions.length === 0) {
        throw new AppError("Vui lòng lựa chọn yêu cầu của bạn", 400)
    }
    if (!description || !content || !duration) {
        throw new AppError("Vui lòng điền đầy đủ thông tin", 400)
    }
    const image = image_url || "https://res.cloudinary.com/da5mlszld/image/upload/v1756055813/IC3-removebg-preview_va4uxe.png"
    let questions = []
    for (const req of require_questions) {
        const { question_type, limit } = req
        console.log(question_type, limit)
        const randomQuestions = await questionModel.aggregate([
            { $match: { question_type: question_type } },
            { $sample: { size: limit } }
        ])
        questions = questions.concat(randomQuestions)
    }
    const examCreated = new exam({
        description,
        content,
        image_url: image,
        duration,
        total_question: questions.length,
        category_id: 1
    })
    const examSaved = await examCreated.save()

    const updated=await questionModel.updateMany({
        _id: { $in: questions.map(q => q._id) }
    }, {
        $push: { exam_id: examSaved._id }
    })
    if (!examSaved) {
        throw new AppError("Cannot create exam", 500)
    }
    if(updated.modifiedCount===0){
        throw new AppError("Cannot update questions with exam", 500)
    }
    return res.status(201).json({ exam: examSaved, questions })
})

module.exports = { getAllQuestion, getQuestionByExam, addQuestions, addExam, removeExam, createExamForRandomQuestions }