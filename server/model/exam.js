const mongoose = require('mongoose');
const getNextSequence = require('../services/getNextSequence');

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

examSchema.pre('validate', async function (next) {
  try {
    if (this.isNew && !this.id) {
      this.id = await getNextSequence('exam_id', { preview: true });
    }
    next();
  } catch (err) {
    next(err);
  }
});

// 2️⃣ Sau khi lưu thành công mới tăng thật counter
examSchema.post('save', async function (doc, next) {
  try {
    await getNextSequence('exam_id'); // tăng thật sau khi lưu thành công
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Exam', examSchema, "Exam");
