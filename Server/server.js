require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const registerRouter = require('./Routes/register')
const loginRouter = require('./Routes/login')

const port = process.env.PORT;

// Connect to DB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Could not connect to MongoDB", err));

const app = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.get("/", (req, res) => {
    res.send("Hello world!");
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

