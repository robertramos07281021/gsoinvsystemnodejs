const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptHistory = new Schema({
  action: {
    type: String,
    enum: ['update','merge','delete','add'],
    required: true
  },
  department: [{
    type: String,
    uppercase: true,
    required: true
  }],
  
  newname: {
    type: String,
    uppercase: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps: true})

module.exports = mongoose.model('History', deptHistory);