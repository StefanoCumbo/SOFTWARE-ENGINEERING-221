//PARKING REQUEST SCHEMA
const mongoose = require('mongoose');
const { Schema } = mongoose;

const parkingSpaceSchema = new Schema({
  //_id is auto created  
    parkingLot: { type: Schema.Types.ObjectId, ref: 'ParkingLot', required: true },
    status: { type: String, enum: ['available', 'occupied', 'reserved', 'blocked'], required: true },
    reservedFor: { type: String, default: null }
});

const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);

module.exports = ParkingSpace;
