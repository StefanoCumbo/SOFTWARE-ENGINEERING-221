const express = require('express')
const router = express.Router();
const User = require('../Models/user');
const BannedUser = require('../Models/banned');

// Endpoint to ban a user
router.post('/:userId', async (req, res) => {
  try {

    const isUserBanned = await BannedUser.findOne({user: req.params.userId})
    if (isUserBanned){
        return res.status(400).send('user is already banned ')
    }


    // Find the user to be banned
    const userToBan = await User.findById(req.params.userId);
    if (!userToBan) {
      return res.status(404).send('User not found');
    }

    const bannedUser = new BannedUser({
      user: userToBan._id,
      email: userToBan.email,
      userName: userToBan.userName,
      phoneNumber: userToBan.phoneNumber
    });
    console.log(bannedUser)

    await bannedUser.save();

    //remove user from user database

    await User.deleteOne({_id: req.params.userId});

    res.send('User has been banned and removed from the User collection');
  } catch (error) {
    console.error('Error banning user:', error);
    res.status(500).send('Failed to ban user');
  }
});

module.exports = router;