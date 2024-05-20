const express = require('express')
const router = express.Router();
const ParkingRequest = require('../Models/parkingRequest')



router.post('/', async(req, res) => {

    console.log("Register route hit")
    const { destination,arrivalDateTime, departureDateTime } = req.body;
  
    try {
      console.log("about to create user")
      const parkingRequest = await ParkingRequest.create({

        destination,
        arrivalDateTime,
        departureDateTime

        
      });
      console.log("parking request created")
  
      await parkingRequest.save();
      res.send("Parking request has been registered");
    } catch(error) {
      console.log(error);
    }
  });

module.exports = router;