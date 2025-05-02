// src/components/Transactions.js
import React, { useState } from 'react';
import { issueBook, returnBook } from '../services/bookServices';

const Transactions = () => {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handleIssueBook = async () => {
    try {
      const transactionData = { bookId, userId };
      const response = await issueBook(transactionData);
      console.log('Book issued:', response);
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  const handleReturnBook = async () => {
    try {
      const response = await returnBook(transactionId);
      console.log('Book returned:', response);
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div>
      <h1>Transactions</h1>

      <h2>Issue Book</h2>
      <input
        type="text"
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleIssueBook}>Issue Book</button>

      <h2>Return Book</h2>
      <input
        type="text"
        placeholder="Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />
      <button onClick={handleReturnBook}>Return Book</button>
    </div>
  );
};

export default Transactions;
