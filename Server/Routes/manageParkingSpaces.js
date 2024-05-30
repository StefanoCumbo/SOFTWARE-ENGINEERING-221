const express = require('express')
const router = express.Router();
const ParkingSpaces = require('../Models/parkingSpace');


router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status , reservedFor} = req.body;

  
    try {

        const updateFields = {
            status: status,
            reservedFor: reservedFor
        };


      // Find the parking space by id and update its status
      const updatedParkingSpace = await ParkingSpaces.findByIdAndUpdate(
        id,
        updateFields,
        { new: true } 
      );

      console.log('Update fields:', updateFields); // Log the fields to be updated

  
      if (!updatedParkingSpace) {
        return res.status(404).send('Parking space not found');
      }
  
      res.status(200).json(updatedParkingSpace);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  





module.exports = router;




