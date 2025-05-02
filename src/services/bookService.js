// src/services/bookServices.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Book Services
export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const addBook = async (bookData) => {
  const response = await axios.post(`${API_URL}/books/add`, bookData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

// Update book
export const updateBook = async (bookId, updatedData) => {
  const response = await axios.put(`${API_URL}/books/update/${bookId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

// Delete book
export const deleteBook = async (bookId) => {
  const response = await axios.delete(`${API_URL}/books/delete/${bookId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

// Get a single book by ID
export const getBookById = async (bookId) => {
  const response = await axios.get(`${API_URL}/books/${bookId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};
