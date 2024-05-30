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
const parkingSpaceRouter = require('./Routes/parkingSpaces')
const parkingLotRouter = require('./Routes/locations')
const sendParkingLotRouter = require('./Routes/parkingLot')
const manageParkingSpacesRouter = require('./Routes/manageParkingSpaces')
const banRouter = require('./Routes/ban')
const deleteRouter = require('./Routes/delete')
const monitorParkingLotsRouter = require('./Routes/monitorParkingLots')





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
app.use('/parkingSpaces', parkingSpaceRouter);
app.use('/locations', parkingLotRouter);
app.use('/parking-lot', sendParkingLotRouter);
app.use('/manage-ParkingSpaces', manageParkingSpacesRouter)
app.use('/ban', banRouter)
app.use('/delete', deleteRouter)
app.use('/monitor-parking-lots', monitorParkingLotsRouter)

app.get("/", (req, res) => {
    res.send("Hello world!");
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});