const express = require('express')
const router = express.Router();
const ParkingSpace = require('../Models/parkingSpace');



router.get('/', async (req, res) => {
    try {
      const parkingSpaces = await ParkingSpace.find().populate('parkingLot');
      res.json(parkingSpaces);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  



  router.get('/:spaceId', async (req, res) => {
    try {
      const { spaceId } = req.params;
      console.log(`Fetching details for parking space ID: ${spaceId}`); // Log the spaceId

      // Fetch the parking space details and populate the parking lot reference
      const parkingSpace = await ParkingSpace.findById(spaceId).populate('parkingLot');
      if (!parkingSpace) {
        console.log('Parking space not found'); // Log not found error

        return res.status(404).send('Parking space not found');
      }
      // Send the parking space details along with the populated parking lot information
      res.status(200).json(parkingSpace);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });







module.exports = router;