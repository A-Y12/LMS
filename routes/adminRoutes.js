const express = require('express');
const { protectAdmin } = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();

// Protect route for Admin only
router.get('/admin/users', protectAdmin, async (req, res) => {
  try {
    const users = await User.find(); // Get all users (admin's data)
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
