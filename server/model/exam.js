const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
    },
    total_user: {
      type: Number,
      default: 0,
    },
    total_question: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
    },
    category_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exam', examSchema,"Exam");
