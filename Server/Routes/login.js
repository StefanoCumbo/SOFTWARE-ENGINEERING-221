const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const { comparePassword } = require('../hash');

router.post('/', async(req, res)=>{
  console.log('/login router hit')


  const {email, password} = req.body;
  try{
    const user = await User.findOne({email});

    if (!user){
        return res.json({
            error: 'Invalid email'
        })
    }
    const match = await comparePassword(password, user.password)
    if(match){
        return res.json("Success, the passwords match")
    }else{
        res.json({error: "the password is incorrect"})
    }




    
  }catch(error){
    console.log(error)

  }
  
});

module.exports = router;
