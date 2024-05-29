const express = require('express')
const router = express.Router();
const ParkingRequest = require('../Models/parkingRequest');
const { ObjectId } = require('mongodb');




router.get('/', async(req,res)=>{

    console.log("Get request received")

    const requests = await ParkingRequest.find()

    res.status(200).json(requests)

    

})



router.patch('/:id', async(req,res)=>{
    const updates = req.body;

    if(ObjectId.isValid(req.params.id)){
        ParkingRequest.updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({error: 'could not update the document'})
        })
    } else{
        res.status(500).json({error: 'Not a valid doc id'})
    }
})






module.exports = router;