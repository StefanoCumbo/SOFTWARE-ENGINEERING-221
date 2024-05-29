require('dotenv').config();
const mongoose = require('mongoose');
const ParkingLot = require('./Models/parkingLot'); 

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected…")
  })
  .catch(err => console.log(err))

const parkingLots = [
  {
    location: 'UEA Triangle Car Park',
    capacity: 100,
    availability: 100,
    type_of_parking: 'Staff/Student Parking',
    price: 5
  },
  {
    location: 'UEA West Car Park',
    capacity: 200,
    availability: 200,
    type_of_parking: 'Staff/Student Parking',
    price: 7
  },
  {
    location: 'UEA Main Car Park',
    capacity: 300,
    availability: 300,
    type_of_parking: 'Staff/Student Parking',
    price: 10
  },
  // add more parking lots as needed
];

ParkingLot.insertMany(parkingLots)
  .then(() => {
    console.log('Data added');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
  });