import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Issue Book (Create Transaction)
export const issueBook = async (transactionData) => {
  const response = await axios.post(`${API_URL}/transactions/issue`, transactionData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

// Return Book (Complete Transaction)
export const returnBook = async (transactionId) => {
  const response = await axios.post(`${API_URL}/transactions/return`, { transactionId }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

// Get all transactions (optional, if needed)
export const getTransactions = async () => {
  const response = await axios.get(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};
