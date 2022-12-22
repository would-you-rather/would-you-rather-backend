'use strict';
require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rooms = require('./models/rooms.js');
const questionList = require('./models/questionList.js');
const questionResponses = require('./models/questionResponse.js');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

/* Functions for managing rooms */
// createRoom creates a room.
app.post('/rooms', async(request, response) => {
  try {
    let roomToCreate = {
      owner: request.body.owner,
      questionListId: request.body.questionListId,
    };

    let newRoom = await rooms.create(roomToCreate);

    response.send(newRoom);
  }
  catch (error) {
    response.status(500).send(error);
  }
});


//updateRoom updates the room with the new question list.
app.put('/rooms/:id', async (request, response) => {

  let id = request.params.id;

  // Find the specified room.
  let room = null;
  try {
    room = await rooms.findOne({ _id: id });

    if (!room) {
      response.status(404).send('Room not found.');
      return;
    }
  } catch (error) {
    response.status(500).send('Error finding room.');
    return;
  }

  // Todo: confirm that the authenticated user is the owner of the room.

  // Update the selected question index to the one provided by the client.
  room.selectedQuestionIndex = request.body.selectedQuestionIndex;

  // Save the updated room.
  response.status(200).send(await room.save());

});

//getRoom returns the room.
app.get('/rooms/:id', async (request, response) => {

  let id = request.params.id;

  let room = null;
  try {
    room = await rooms.findOne({ _id: id });

    if (!room) {
      response.status(404).send('Room not found.');
      return;
    }
  } catch (error) {
    response.status(500).send('Error finding room.');
    return;
  }

  response.status(200).send(room);

});

// getQuestionLists returns a list of questions.
app.get('/questionLists', async(request, response) => {
  try {
    let result = await questionList.find();
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Find the specified question list.
app.get('/questionLists/:questionListId', async(request, response) => {
  let questionListId = request.params.questionListId;

  let questionListToGet = null;
  try {
    questionListToGet = await questionList.findOne({ 
      questionListId: questionListId
    });

    if (!questionListToGet) {
      response.status(404).send('Question list not found.');
      return;
    }
  } catch (error) {
    response.status(500).send('Error finding question list.');
    return;
  }

  response.status(200).send(questionListToGet);
});

// Save the user's response to a question.
app.post('/questionResponses', async(request, response) => {
  try{
    let newResponse = await questionResponses.create(request.body);

    response.status(200).send(newResponse);
  }
  catch (error){
    response.status(500).send(error);
  }
});

// Return all user responses to a question..
app.get('/questionResponses/:roomId', async(request, response) => {

  let roomId = request.params.roomId;

  let responses = null;
  try {
    responses = await questionResponses.find({
      roomId: roomId
    });

    if (!responses) {
      response.status(404).send('Responses not found.');
      return;
    }
  } catch (error) {
    response.status(500).send('Error finding responses.');
    return;
  }
  console.log('responses', responses);
  response.status(200).send(responses);

});


//getQuestioninRoom returns the question in the room.
app.get('/getQuestioninRoom', (request, response) => {
  response.send('Hello World');
});

//savepollResponse saves the poll response.
app.post('/savepollResponse', (request, response) => {
  response.send('Hello World');
});

//getPollResponse returns the poll response.
app.get('/getPollResponse', (request, response) => {
  response.send('Hello World');
});


app.use('*', (request, response) => {
  response.status(500).send('Invalid Request, page not found.');
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
