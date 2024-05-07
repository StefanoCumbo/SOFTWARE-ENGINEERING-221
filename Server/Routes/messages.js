// const express = require('express');
// const app = express();
// app.use(express.json());

// let messages = [];

// app.post('/send_message', (req, res) => {
//     const { sender, recipient, content } = req.body;
//     messages.push({ sender, recipient, content });
//     res.json({ status: 'Message sent!' });
// });

// app.get('/get_messages', (req, res) => {
//     const { sender, recipient } = req.query;
//     const filteredMessages = messages.filter(m => (m.sender === sender && m.recipient === recipient) || (m.sender === recipient && m.recipient === sender));
//     res.json(filteredMessages);
// });

// app.listen(3001, () => console.log('Server running on port 3001'));
