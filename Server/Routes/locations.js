const express = require('express')
const router = express.Router();
const ParkingLot = require('../Models/parkingLot');



router.get('/', async (req, res) => {
    try {
      const parkingLots = await ParkingLot.find();
      res.json(parkingLots);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  







module.exports = router;