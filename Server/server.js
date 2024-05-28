require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialise router
const registerRouter = require('./Routes/register')
const loginRouter = require('./Routes/login')
const manageRequestsRouter = require('./Routes/manageRequests')
const sendParkingRequestRouter = require('./Routes/sendParkingRequest')
const parkingLotRouter = require('./Routes/locations')
const parkingSpaceRouter = require('./Routes/parkingSpaces')





//PORT
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
app.use(express.json());


//routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/manage-requests', manageRequestsRouter);
app.use('/sendParkingRequest', sendParkingRequestRouter);
app.use('/locations', parkingLotRouter)
app.use('/parkingSpaces', parkingSpaceRouter)

app.get("/", (req, res) => {
    res.send("Hello world!");
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

