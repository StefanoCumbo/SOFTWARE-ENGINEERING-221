//DB FOR MESSAGE SCHEMA 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    //_id: is auto added
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    messageContent: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
