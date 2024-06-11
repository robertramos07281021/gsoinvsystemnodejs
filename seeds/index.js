const mongoose = require('mongoose');
const Dept = require('../models/department')
const User = require('../models/user')
const Request = require('../models/request')
const Unit = require('../models/unit')
const Item = require('../models/items')
const History = require('../models/history')
const Deploy = require('../models/deployedItem')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
  .then(()=> {
    console.log('Successfully added')
  })
  .catch(err => {
    console.log('Error : ',err)
  })


 const seedDB = async() => {
  await Dept.deleteMany({})
  await User.deleteMany({id: {$ne: '6662ce69e1b7653a75876c1a'}})
  await Request.deleteMany({})
  await Unit.deleteMany({})
  await Item.deleteMany({})
  await History.deleteMany({})
  await Deploy.deleteMany({})
  const dept = new Dept({department: `HR`}); 
  await dept.save();
 }

 seedDB().then(()=> {
  mongoose.connection.close();
 })