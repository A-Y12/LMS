// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    res.status(200).send({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting transaction' });
  }
});


// Get paginated transactions with book and user details populated
router.get('/', async (req, res) => {
  const { page = 1, limit = 2 } = req.query; // Pagination, default to page 1, 2 transactions per page

  try {
    const transactions = await Transaction.find()
      .populate('bookId') // Populate the book title from Book model
      .populate('userId')  // Populate the user's name from User model
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Transaction.countDocuments(); // Get the total number of transactions

    res.json({
      transactions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions', details: error });
  }
});

module.exports = router;
