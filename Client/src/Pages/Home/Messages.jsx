import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Messages() {
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        const res = await axios.post('/send_message', { sender, recipient, content });
        console.log(res.data);
        setContent('');
        loadMessages();
    };

    const loadMessages = async () => {
        const res = await axios.get('/get_messages', { params: { sender, recipient } });
        setMessages(res.data);
    };

    useEffect(() => {
        loadMessages();
    }, []);

    return (
        <div>
            <h1>Message test</h1>
            {messages.map((message, index) => (
                <p key={index}>{message.content}</p>
            ))}
            <input type="text" value={sender} onChange={e => setSender(e.target.value)} placeholder="Sender" />
            <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Recipient" />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Message"></textarea>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
}

export default Messages;
