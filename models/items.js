const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
 
  name: {
    type: String,
    required: true,
    uppercase: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
 
})

module.exports = mongoose.model('Item', ItemsSchema);