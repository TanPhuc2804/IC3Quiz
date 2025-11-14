"use strict";

var mongoose = require('mongoose');
var packageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number || String,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  benefits: {
    type: [String],
    "default": []
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Package', packageSchema, "Package");