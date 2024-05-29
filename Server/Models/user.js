//USER DB SCHEMA 
const mongoose = require('mongoose');
const {Schema} = mongoose;


//these field names just be the same as the register form or it wont work.

const userSchema = new Schema({
 //_id : is auto added
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    userType:{type: String, enum:["admin" ,"driver"]}
  });

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

