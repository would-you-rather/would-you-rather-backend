'use strict';

const mongoose = require('mongoose');

const roomSchema= new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  questionListId: {
    type: String,
    required: true
  },
  selectedQuestionIndex: {
    type: Number,
    required: false
  },
});


module.exports = mongoose.model('rooms', roomSchema);
