// src/components/Books.js
import React, { useState, useEffect } from 'react';
import { getBooks, addBook } from '../services/bookServices';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({ title: '', author: '' });

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const booksList = await getBooks();
      setBooks(booksList);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async () => {
    try {
      const newBook = await addBook(bookData);
      console.log('Book added:', newBook);
      fetchBooks();  // Refresh the list after adding a book
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h1>Books List</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title} by {book.author}</li>
        ))}
      </ul>

      <h2>Add a New Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={bookData.title}
        onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        value={bookData.author}
        onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
      />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default Books;
