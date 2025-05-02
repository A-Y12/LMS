const User = require('../models/userModel');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user
const addUser = async (req, res) => {
  console.log(" i m ");
  const { name, password } = req.body;
  const user = new User({ name, password });

  try {
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, password, role }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("here");

  try {
    // Find user in the database by username and password
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // User found, return user details
    res.json({ message: 'Sign-in successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating user' });
  }
};




// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, addUser, authenticateUser, updateUser, deleteUser };


// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Transaction = require('../models/transactionModel');
// const Book = require('../models/bookModel');  // From MongoDB

// // User registration
// exports.registerUser = async (req, res) => {
//   const { email, password, role } = req.body;
//   try {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ email, password: hashedPassword, role });
//     res.status(201).json({ message: 'User registered', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // User login
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token, role: user.role });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // User issue book
// exports.issueBook = async (req, res) => {
//   const { bookId } = req.body;
//   const userId = req.user.id; // Get user ID from JWT token

//   try {
//     // Check if the book is available
//     const book = await Book.findById(bookId);
//     if (!book || book.availableCopies < 1) {
//       return res.status(400).json({ message: 'Book not available' });
//     }

//     // Create a transaction for the issued book
//     const transaction = await Transaction.create({ userId, bookId, status: 'issued' });

//     // Update book's available copies
//     book.availableCopies -= 1;
//     await book.save();

//     res.status(200).json({ message: 'Book issued', transaction });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // User return book
// exports.returnBook = async (req, res) => {
//   const { transactionId } = req.body;
//   const userId = req.user.id;

//   try {
//     // Find the transaction and ensure it belongs to the user
//     const transaction = await Transaction.findOne({ where: { id: transactionId, userId, status: 'issued' } });
//     if (!transaction) {
//       return res.status(400).json({ message: 'Invalid transaction or book already returned' });
//     }

//     // Mark the transaction as returned
//     transaction.status = 'returned';
//     transaction.returnDate = new Date();
//     await transaction.save();

//     // Update book's available copies
//     const book = await Book.findById(transaction.bookId);
//     book.availableCopies += 1;
//     await book.save();

//     res.status(200).json({ message: 'Book returned', transaction });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
