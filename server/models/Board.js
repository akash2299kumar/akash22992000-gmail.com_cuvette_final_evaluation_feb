
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  people: [{
    email: { type: String, required: true },
    _id: false  
  }],
  
});


const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
