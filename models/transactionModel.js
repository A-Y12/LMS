const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['issue', 'return'], 
    required: true,
  },
  amount: { 
    type: Number, 
    required: true, 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true 
  },
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book', // Reference to the Book model
    required: true 
  },
  transactionDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
