require('dotenv').config();
const mongoose = require('mongoose');
const ParkingSpace = require('./Models/parkingSpace'); 

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected…")
  })
  .catch(err => console.log(err))

const parkingSpaces = [
  {
    parkingLot: '6658e5c94ca1d3d3aa736b1a', // 1
    status: 'available',
    reservedFor: null
  },
  {
    parkingLot: '6658e5c94ca1d3d3aa736b1a', // 2
    status: 'available',
    reservedFor: null
  },
  // {
  //   parkingLot: '6658bf9a81510708f5d7de78', // 3
  //   status: 'available',
  //   reservedFor: null
  // },
  // {
  //   parkingLot: '6658bfd081510708f5d7de7a', // 4
  //   status: 'available',
  //   reservedFor: null
  // },
  // {
  //   parkingLot: '6658bfd081510708f5d7de7a', // UEA MAIN
  //   status: 'available',
  //   reservedFor: null
  // },
  // {
  //   parkingLot: '6658bfd081510708f5d7de7a', // 6
  //   status: 'available',
  //   reservedFor: null
  // },
  // {
  //   parkingLot: '6658bffa81510708f5d7de7c', // UEA MAIN
  //   status: 'available',
  //   reservedFor: null
  // }
  // ,{
  //   parkingLot: '6658bffa81510708f5d7de7c', // 8
  //   status: 'available',
  //   reservedFor: null
  // }
    
    
  
  // add more parking spaces as needed
];

ParkingSpace.insertMany(parkingSpaces)
  .then(() => {
    console.log('Data added');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
  });
