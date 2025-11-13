const mongoose = require('mongoose');
const getNextSequence = require('../services/getNextSequence');

const matchQuestionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    term: { type: String, required: true },
    definition: { type: String, required: true },
  },
  { _id: false }
);

const multipleQuestionSchema = new mongoose.Schema(
  {
    option_text: { type: String, required: true },
    is_correct: { type: Boolean, required: true },
  },
  { _id: false }
);

const classifyQuestionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    content: { type: String, required: true },
    classify: { type: String, required: true },
  },
  { _id: false }
);

const examQuestionSchema = new mongoose.Schema(
  {
    exam_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
      },
    ],
    id: {
      type: Number, 
      unique: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: Number,
    },
    question_type: {
      type: String,
      enum: ['normal', 'drop_match', 'multiple', 'classify'],
      required: true,
    },
    option: {
      type: [String],
      default: [],
    },
    correct_answer: {
      type: String,
    },
    match_question: {
      type: [matchQuestionSchema],
      default: [],
    },
    limit_choice: {
      type: Number,
    },

    multiple_question: {
      type: [multipleQuestionSchema],
      default: [],
    },

    classify_question: {
      type: [classifyQuestionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// examQuestionSchema.pre('save', async function (next) {
//   if (this.isNew && !this.id) {
//     this.id = await getNextSequence('question_id');
//   }
//   next();
// });

module.exports = mongoose.model('Question', examQuestionSchema, 'Question');
