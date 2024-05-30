const express = require('express')
const router = express.Router();
const User = require('../Models/user');

router.delete('/:userId', async (req, res) => {
  try {

    await User.deleteOne({_id: req.params.userId});

    res.send('removed from the User collection');
  } catch (error) {
    console.error('Error banning user:', error);
    res.status(500).json({message: 'Failed to remove user'});
  }
});

module.exports = router;