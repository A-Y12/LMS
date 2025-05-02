// const express = require('express');
// const { getAllUsers, addUser,authenticateUser, updateUser, deleteUser } = require('../controllers/userController');
// const router = express.Router();

// router.get('/', getAllUsers);
// router.post('/login', authenticateUser);
// router.post('/', addUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);



// module.exports = router;


// // const express = require('express');
// // const { registerUser, loginUser, issueBook, returnBook } = require('../controllers/userController');
// // const router = express.Router();
// // const { authenticateUser } = require('../middleware/authMiddleware');  // For protected routes

// // router.post('/register', registerUser);
// // router.post('/login', loginUser);
// // router.post('/issue', authenticateUser, issueBook);  // Protected
// // router.post('/return', authenticateUser, returnBook);  // Protected

// // module.exports = router;

// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

// Get all users
// GET /api/users (with pagination)
router.get('/', async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    try {
      const users = await User.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      const totalUsers = await User.countDocuments();
      res.json({
        users,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

// Add a user (Admin only)
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    res.status(500).json({ message: 'Error fetching user details', error });
  }
});




// Edit a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/signin', async (req, res) => {
    const { password } = req.body;
    try {
      const user = await User.findOne({ password });
      if (!user) {
        return res.status(400).json({ message: 'User not found. Only admin-added users can sign in.' });
      }
      res.json({ message: 'Sign-in successful', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get user transactions
router.get('/:id/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.id }).populate('bookId');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Backend route to fetch issued books for a specific user
router.get('/:id/issued-books', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(req.params.id).populate('issuedBooks'); // Assuming issuedBooks is a reference to Book schema
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ issuedBooks: user.issuedBooks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issued books', error });
  }
});


module.exports = router;

