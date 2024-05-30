//PARKING LOTS DB SCHEMA 
const mongoose = require('mongoose');
const {Schema} = mongoose;




const parkingLotSchema = new Schema({
 //_id : is auto added

  location: {type: String, required:true, unique: true},
  capacity: {type: Number, min: 0, } ,
  availability: {type:Number, min: 0, },
  type_of_parking: {type: String, enum:['Disabled Parking', 'Visitor Parking', 'Staff/Student Parking']},
  price: {type: Number}
});

// Create a model from the schema
const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);

module.exports = ParkingLot;
