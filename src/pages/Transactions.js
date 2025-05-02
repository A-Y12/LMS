import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/transactionService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await getTransactions();
      setTransactions(data);
    }
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            Book ID: {transaction.bookId}, User ID: {transaction.userId}, Due Date: {transaction.dueDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
