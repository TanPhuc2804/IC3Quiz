const mongoose = require('mongoose');


const resultDetailSchema = new mongoose.Schema(
  {
    question_id: {
      type: Number,
      required: true,
    },
    question: {
      type: Number,
      required: true,
    },
    question_type: {
      type: String,
      enum: ['normal', 'classify', 'multiple', 'drop_match'],
      required: true,
    },
    user_answer: {
      type: mongoose.Schema.Types.Mixed, 
      required: false,
    },
  },
  { _id: false }
);

resultDetailSchema.virtual("question_info", {
  ref: "Question",
  localField: "question_id", // field ở Result
  foreignField: "id",        // field ở Question
  justOne: true,
});

resultDetailSchema.set("toObject", { virtuals: true });
resultDetailSchema.set("toJSON", { virtuals: true });



const examResultSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    submit_time: {
      type: Number, 
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    accurary_percentage: {
      type: Number,
      required: true,
    },
    error_percentage: {
      type: Number,
      required: true,
    },
    total_content: {
      type: Number,
      required: true,
    },
    result_detail: {
      type: [resultDetailSchema],
      default: [],
    },
  },
  { timestamps: true,minimize:true,toObject: { virtuals: true }, toJSON: { virtuals: true } }
);



module.exports = mongoose.model('Example_Result', examResultSchema,'Example_Result');
