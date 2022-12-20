'use strict';

const mongoose = require('mongoose');

const questionListSchema = new mongoose.Schema({
  questionListId: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: true
  },
});

module.exports = mongoose.model('questionList', questionListSchema);
