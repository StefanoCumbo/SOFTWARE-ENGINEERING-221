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
    parkingLot: '6655c56bb5c556df3835913c', // 1
    status: 'available',
    reservedFor: null
  },
  {
    parkingLot: '6655c56bb5c556df3835913c', // 2
    status: 'available',
    reservedFor: null
  },
  {
    parkingLot: '6655c56bb5c556df3835913c', // UEA MAIN
    status: 'available',
    reservedFor: null
  },
  {
    parkingLot: '6655c56bb5c556df3835913c', // 4
    status: 'available',
    reservedFor: null
  },
  {
    parkingLot: '6655c56bb5c556df3835913c', // UEA MAIN
    status: 'available',
    reservedFor: null
  },
  {
    parkingLot: '6655c56bb5c556df3835913c', // 6
    status: 'available',
    reservedFor: null
  },
  {
    parkingLot: '6655c56bb5c556df3835913c', // UEA MAIN
    status: 'available',
    reservedFor: null
  }
  ,{
    parkingLot: '6655c56bb5c556df3835913c', // 8
    status: 'available',
    reservedFor: null
  }
    
    
  
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
