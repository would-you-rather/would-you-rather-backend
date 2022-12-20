'use strict';

const mongoose = require('mongoose');

const questionResponseSchema= new mongoose.Schema({
  roomId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  questionListId: {
    type: String,
    required: true
  },
  questionIndex: {
    type: Number,
    required: true
  },
  selectedResponseIndex: {
    type: Number,
    required: true
  }
});


module.exports = mongoose.model('questionResponses', questionResponseSchema);
