//PAYMENT DB SCHEMA 
const mongoose = require('mongoose');
const {Schema} = mongoose;


const paymentSchema = new Schema({
    //_id : is auto added
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
    paymentMethod: { type: String, required: true }

});


// Create a model from the schema
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;









