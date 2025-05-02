// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   price: { type: Number, required: true }, 
//   available: { type: Boolean, default: true }, // Book availability status
// });

// const issuedBookSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
//   issueDate: { type: Date, default: Date.now },
// });

// const Book = mongoose.model('Book', bookSchema);
// const IssuedBook = mongoose.model('IssuedBook', issuedBookSchema);

// module.exports = { Book, IssuedBook };

// models/bookModel.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  //pages: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
 issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

module.exports = mongoose.model('Book', bookSchema);
