const mongoose = require('mongoose');
const getNextSequence = require('../services/getNextSequence');

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: false,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status : {
      type: String,
      enum: ['active', 'expired', 'none',"paid"],
      required: true,
      lowercase: true,
      trim: true,
      default: 'none',
    },
    package: {
      package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        default: null,
      },
      register_date: {
        type: Date,
        default: null,
      },
      expire_date: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre('validate', async function (next) {
  try {
    if (this.isNew && !this.id) {
      this.id = await getNextSequence('user_id', { preview: true });
    }
    next();
  } catch (err) {
    next(err);
  }
});

// 2️⃣ Sau khi lưu thành công mới tăng thật counter
userSchema.post('save', async function (doc, next) {
  try {
    await getNextSequence('user_id'); // tăng thật sau khi lưu thành công
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model('User', userSchema, "User");
