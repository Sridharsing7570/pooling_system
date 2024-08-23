const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [optionSchema],
});

const Questions = mongoose.model("Question", questionSchema);

module.exports = Questions;
