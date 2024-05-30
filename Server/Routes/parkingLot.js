const express = require('express')
const router = express.Router();
const ParkingLot = require('../Models/parkingLot')
const ParkingSpace = require('../Models/parkingSpace')



router.post('/', async (req, res) => {
    const newParkingLot = new ParkingLot({
      location: req.body.location,
      capacity: req.body.capacity,
      availability: req.body.availability,
      type_of_parking: req.body.type_of_parking,
      price: req.body.price
    });
  
    try {
      const savedParkingLot = await newParkingLot.save();
      res.status(201).json(savedParkingLot);
    } catch (err) {
      if (err.code === 11000) {
        // This is a duplicate key error (location already exists)
        res.status(400).json({ message: 'Location already exists' });
      } else {
        res.status(400).json({ message: err });
      }
    }
  });


  router.delete('/:id', async (req, res) => {
    try {

  
        const removedParkingLot = await ParkingLot.deleteOne({ _id: req.params.id });
        if (removedParkingLot.deletedCount > 0) {
            res.json({ message: "Successfully deleted parking lot" });
        } else {
            res.json({ message: "No parking lot found with the provided ID" });
        }
    } catch (err) {
        res.json({ message: err });
    }
});






module.exports = router; 