const Transaction = require('../models/transactionModel');
const Book = require('../models/bookModel');

// Allot a book to a user
const allotBook = async (req, res) => {
  const { userId, bookId } = req.body;
  const book = await Book.findById(bookId);

  if (book.availableCopies > 0) {
    const transaction = new Transaction({ userId, bookId, status: 'borrowed', date: Date.now() });
    await transaction.save();
    book.availableCopies -= 1;
    await book.save();
    res.json(transaction);
  } else {
    res.status(400).json({ message: 'No copies available' });
  }
};

// Return a book
const returnBook = async (req, res) => {
  const { transactionId } = req.body;
  const transaction = await Transaction.findById(transactionId);

  transaction.status = 'returned';
  transaction.returnDate = Date.now();
  await transaction.save();

  const book = await Book.findById(transaction.bookId);
  book.availableCopies += 1;
  await book.save();

  res.json({ message: 'Book returned successfully' });
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user').populate('book');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transactions', error });
  }
};

// Get total transaction amount
exports.getTotalTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const totalAmount = transactions.reduce((total, txn) => total + txn.totalAmount, 0);
    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating total transaction amount', error });
  }
};

module.exports = { allotBook, returnBook};


// const Transaction = require('../models/transactionModel');

// // Get all transactions for a user
// exports.getTransactions = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const transactions = await Transaction.findAll({ where: { userId } });
//     res.status(200).json(transactions);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
