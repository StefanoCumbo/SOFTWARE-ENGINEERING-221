const express = require('express')
const router = express.Router();
const ParkingRequest = require('../Models/parkingRequest')
const User = require('../Models/user')



router.post('/', async(req, res) => {

    console.log("Register route hit")
    const { destination,arrivalDateTime, departureDateTime, email } = req.body;

    try{

      const user =  await User.findOne({email});
      if(!user){
        return res.send("User not found");
      }

    




  
    
      
      const parkingRequest = await ParkingRequest.create({
        user: user._id,
        email,
        status: 'pending',
        destination,
        arrivalDateTime,
        departureDateTime,
        assignedSpace: null

        
      });
      console.log("parking request created")
  
      await parkingRequest.save();
      res.send("Parking request has been registered");
    } catch(error) {
      console.log(error);
    }
  });


  

module.exports = router;