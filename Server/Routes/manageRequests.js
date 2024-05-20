const express = require('express')
const router = express.Router();
const ParkingRequest = require('../Models/parkingRequest')




router.get('/', async(req,res)=>{

console.log("Get request received")

const requests = await ParkingRequest.find()

res.status(200).json(requests)

    

    

})






module.exports = router;