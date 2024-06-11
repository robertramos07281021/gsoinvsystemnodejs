const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')



const UserSchema = new Schema ({
  address: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true
  },
  
  lastname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    lowercase: true
  },
  status: {
    type: String,
    required: true,
    default: 'active',
    enum: ['active', 'inactive'],
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  phone: {
    type: Number,
    required: true,
    unique: true

  },
  department: {
    type: String,
    required: true,
    uppercase:true
  },
  request: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist'
  }],
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'History'
  }]
    
    
  

})



UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);