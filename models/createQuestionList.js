'use strict';
const Questions = require('./questionList.js');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);


const seedDataBase = async () => {

  await Questions.create({
    questionListId: 'Fun',
    questions: [
      [ 'Have a rewind button', 'Have pause button on your life'],
      [ 'be Batman', 'be Spiderman'],
      [ 'be a superhero', 'be a supervillain'],
      [ 'be a wizard', 'be a vampire'],
    ]

  });
  console.log('questions added');
  mongoose.disconnect();

};


seedDataBase();



