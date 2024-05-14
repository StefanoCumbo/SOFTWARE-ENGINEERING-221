const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const { hashedPassword } = require('../../hash');


router.post('/', async(req, res) => {
  console.log("Register route hit")
  const { userType, firstName, lastName, userName, email, phoneNumber, password} = req.body;
  const hashed = await hashedPassword(password)

  try {
    console.log("about to create user")
    const user = await User.create({
      userType,
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password: hashed
    });
    console.log("user created")

    await user.save();
    res.send("User has been registered");
  } catch(error) {
    console.log(error);
  }
});



module.exports = router;




/////////////////////////////////////////////////////
//validation test
   
    // if(!password || password.length < 6){
    //   return res.json({
    //     error: "Password is required and should be at least 6 characters"
    //   })
    // }

    // const exist = await User.findOne({email});
    // if (exist){
    //   return res.json({
    //     error: "This email has been taken "
    //   })
    // }