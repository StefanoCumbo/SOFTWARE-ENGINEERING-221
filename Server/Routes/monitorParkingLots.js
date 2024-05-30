const express = require('express')
const router = express.Router();
const ParkingLot = require('../Models/parkingLot')



router.get('/', async(req,res)=>{

    console.log("Get request received")

    const requests = await ParkingLot.find()

    res.status(200).json(requests)

    

})


module.exports = router;