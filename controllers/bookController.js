const { Book, IssuedBook } = require('../models/bookModel');

// Get all available books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ available: true });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author,price} = req.body;
  try {
    const newBook = new Book({ title, author,price});
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book', error: err });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, price }, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err });
  }
};


exports.getUserIssuedBooks = async (req, res) => {
  const { userId } = req.params;

  try {
    const issuedBooks = await IssuedBook.find({ userId }).populate('bookId');
    res.json(issuedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issued books' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err });
  }
};

// Issue a book to a user
exports.issueBook = async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book || !book.available) {
      return res.status(400).json({ message: 'Book not available' });
    }

    const newIssuedBook = new IssuedBook({ userId, bookId });
    await newIssuedBook.save();

    book.available = false;
    await book.save();

    res.status(200).json({ message: 'Book issued successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error issuing book', error: err });
  }
};

// Return an issued book
exports.returnBook = async (req, res) => {
  const { issuedBookId } = req.params;
  try {
    const issuedBook = await IssuedBook.findById(issuedBookId);
    if (!issuedBook) {
      return res.status(404).json({ message: 'Issued book not found' });
    }

    const book = await Book.findById(issuedBook.bookId);
    book.available = true;
    await book.save();

    await IssuedBook.findByIdAndDelete(issuedBookId);

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error returning book', error: err });
  }
};
