// const express = require('express');
// const router = express.Router();
// const bookController = require('../controllers/bookController');

// // CRUD routes for books
// router.get('/', bookController.getAllBooks);
// router.post('/', bookController.addBook);
// router.put('/:id', bookController.updateBook);
// router.delete('/:id', bookController.deleteBook);
// router.get('/:userId/issued-books', bookController.getUserIssuedBooks);
// // Issuing and returning books
// router.post('/issue', bookController.issueBook);
// router.delete('/return/:issuedBookId', bookController.returnBook);

// module.exports = router;


// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

// Get books with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const books = await Book.find().limit(limit * 1).skip((page - 1) * limit);
    const count = await Book.countDocuments();
    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  const { title, author, price, pages } = req.body;
  try {
    const book = new Book({ title, author, price, pages });
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Edit book
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, price, pages } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, price, pages }, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Delete book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
});


// POST /api/issue-book
router.post('/issue-book', async (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ message: 'userId and bookId are required' });
  }

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    // Ensure the user and book exist
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the book is already issued
    if (!book.issuedBy) {
      book.issuedBy = user._id; // Assign the book to the user
      await book.save();

      user.issuedBooks.push(book._id); // Add the book to the user's issued books list
      await user.save();
      const transaction = new Transaction({
        type: 'issue',
        amount: book.price,
        bookId: book._id,
        userId: user._id,
      });
      await transaction.save();

      res.json({ message: 'Book issued successfully!' });
    } else {
      res.status(400).json({ message: 'Book is already issued by another user!' });
    }
  } catch (error) {
    console.error('Error issuing book:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/return-book
router.post('/return-book', async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (book.issuedBy && book.issuedBy.toString() === userId) {
      book.issuedBy = null; // Mark book as not issued
      await book.save();

      user.issuedBooks = user.issuedBooks.filter(book => book.toString() !== bookId); // Remove book from user's issued books list
      await user.save();

      const transaction = new Transaction({
        type: 'return',
        amount: book.price,
        bookId: book._id,
        userId: user._id,
      });
      await transaction.save();

      res.json({ message: 'Book returned successfully!' });
    } else {
      res.status(400).json({ message: 'This book was not issued by this user!' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
