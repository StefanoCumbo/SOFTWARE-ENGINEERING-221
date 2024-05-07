//USER DB SCHEMA 
const mongoose = require('mongoose');
const {Schema} = mongoose;




const userSchema = new Schema({
 //_id : is auto added
    firstname: {type: String, required: true},
    surname: {type: String, required: true},
    mobile: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true}, 
    hashed_password: {type: String, required: true},
    userType:{type: String, enum:["admin,driver,"]}
  });

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
