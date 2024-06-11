const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeployedItem = new Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },
  qty: {
    type: Number,
    default: 1,
    required: true,
    min: 1
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }
})


module.exports = mongoose.model('Deployed', DeployedItem);