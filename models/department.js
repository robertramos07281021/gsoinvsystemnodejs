const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Deploy = require('./deployedItem')
const Unit = require('./unit')

const DepartementSchema = new Schema({
  department:{
    type: String,
    require: true,
    unique: true,
    uppercase: true
  },
  deployed: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deployed"
  }
]
})

DepartementSchema.post('findOneAndDelete', async(data) => {
  if(data) {
    Array.from(data.deployed).forEach(async(element) => {
      const deploy = await Deploy.findById(element)
      const updateUnit = await Unit.updateOne({item: {$eq: deploy.item}},{$inc: {qty: deploy.qty}})
    })
    await Deploy.deleteMany({_id: {$in: data.deployed}})
  }
})





module.exports = mongoose.model('Department', DepartementSchema);