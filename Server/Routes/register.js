const express = require('express');
const app = express();
const User = require('../Models/user')

app.post('/register', async(req, res) => {
  console.log("Register route hit")
  const { userType, firstName, lastName, userName, email, phoneNumber, password} = req.body;

  try {
    const user = new User({
      userType,
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password
    });

    await user.save();
    res.status(201).send("User has been registered");
  } catch(error) {
    res.status(500).send("There was an error: " + error);
  }
});


module.exports = app;