const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestUnit = new Schema({
 
  deployed: {
    type: Object
  },
  item: {
    type:Object
  },
  department: {
    type: Object
  },
  qty: {
    type: Number,
    required: true,
    min: 1, 
    default: 1,
  },
  approve: {
    type: Boolean,
    default: false,
   
  },
  approvedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  approvedate: {
    type: Date
  },
  receive: {
    type: Boolean,
    default: false
  },
  receivedate: {
    type: Date,

  },
  stamp: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  tracking: {
    type: String
  }
 
},{timestamps: true});



module.exports = mongoose.model('Request', RequestUnit);