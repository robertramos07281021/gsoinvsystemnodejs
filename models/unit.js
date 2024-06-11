const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },
  qty: {
    type: Number,
    default: 1,
    required: true,
    min: [0],
  }
})

module.exports = mongoose.model('Unit', UnitSchema);