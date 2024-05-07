//PARKING REQUEST DB SCHEMA 
const mongoose = require('mongoose');
const {Schema} = mongoose;




const parkingRequestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedSpace: { type: Schema.Types.ObjectId, ref: 'ParkingSpaces', default: null },

    status: { type: String, enum: ['pending', 'approved', 'rejected'], required: true },
    destination: { type: String, required: true },
    arrivalDateTime: { type: Date, required: true },
    departureDateTime: { type: Date, required: true },
});

// Create a model from the schema
const ParkingRequest = mongoose.model('ParkingRequest', parkingRequestSchema);

module.exports = ParkingRequest;
