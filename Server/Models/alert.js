//DB SCHEMA FOR ALERTS
const mongoose = require('mongoose');
const { Schema } = mongoose;

const alertSchema = new Schema({
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    alertType: { type: String, required: true },
    relatedDriver: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    timestamp: { type: Date, default: Date.now }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
