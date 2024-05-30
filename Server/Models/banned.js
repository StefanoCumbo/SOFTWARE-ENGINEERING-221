//USER DB SCHEMA 
const mongoose = require('mongoose');
const {Schema} = mongoose;


//these field names just be the same as the register form or it wont work.

const bannedUserSchema = new Schema({
 //_id : is auto added
 user: { type: Schema.Types.ObjectId, ref: 'User' },
 email: { type: String, required: true },
 userName: { type: String, required: true },
 phoneNumber: {type: String, required: true},


    
  });

// Create a model from the schema
const BannedUser = mongoose.model('BannedUser', bannedUserSchema);

module.exports = BannedUser;

