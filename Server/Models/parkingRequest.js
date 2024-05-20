//PARKING REQUEST DB SCHEMA 
const mongoose = require('mongoose');
const {Schema} = mongoose;




const parkingRequestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedSpace: { type: Schema.Types.ObjectId, ref: 'ParkingSpaces', default: null },

    status: { type: String, enum: ['pending', 'approved', 'rejected'] },
    destination: { type: String, enum:['The Innovation Centre', 'New Science Building',
        'Norwich Business School','The Enterprise Centre', 'Uea Law School', 'INTO'
    ], required: true },
    arrivalDateTime: { type: Date, required: true },
    departureDateTime: { type: Date, required: true },
});

// Create a model from the schema
const ParkingRequest = mongoose.model('ParkingRequest', parkingRequestSchema);

module.exports = ParkingRequest;

