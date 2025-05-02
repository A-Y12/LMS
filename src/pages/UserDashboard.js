import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('profile');

  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchAvailableBooks(page);
      fetchUserIssuedBooks();
    }
  }, [userId, page]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setUser(res.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableBooks = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/books?page=${page}&limit=5`);
      setAvailableBooks(res.data.books.filter(book => !book.issuedBy));
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching available books:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserIssuedBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/users/${userId}/issued-books`);
      setIssuedBooks(res.data.issuedBooks);
    } catch (error) {
      console.error('Error fetching issued books:', error);
    } finally {
      setLoading(false);
    }
  };

  const issueBook = async (bookId) => {
    try {
      await axios.post('http://localhost:5000/api/books/issue-book', { userId, bookId });
      fetchAvailableBooks(page);
      fetchUserIssuedBooks();
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  const returnBook = async (bookId) => {
    try {
      await axios.post('http://localhost:5000/api/books/return-book', { userId, bookId });
      fetchAvailableBooks(page);
      fetchUserIssuedBooks();
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  if (!userId) return <p>Error: User not found.</p>;

  return (
    <div className="user-dashboard-container">
      <aside className="sidebar">
        <nav className="nav-links">
          <button onClick={() => setActiveTab('profile')}>Profile</button>
          <button onClick={() => setActiveTab('available')}>Available Books</button>
          <button onClick={() => setActiveTab('issued')}>Issued Books</button>
        </nav>
      </aside>

      <main className="main-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Profile Tab */}
            {/* {activeTab === 'profile' && user && (
              <div className="profile-tab center-content">
                <img
                  src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
                  alt="Profile GIF"
                  className="profile-gif"
                />
                <h2>ayush</h2>
                <p>{user.email}</p>
              </div>
            )} */}
            {activeTab === 'profile' && user && (
  <div className="profile-tab center-content" style={{ display: 'block', color: 'black', zIndex: 1000 }}>
    <img
        src={process.env.PUBLIC_URL + '/images/profile1.png'} 
       alt="Digital Loading Brain"
      className="profile-gif"
      style={{ width: '220px', height: 'auto', marginBottom: '25px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
    />
    <h2>{user.name||"No name"}</h2>
    <p>{user.email||"No email"}</p>
  </div>
)}


            {/* Available Books */}
            {activeTab === 'available' && (
              <div className="available-books-tab">
                <h2>Available Books</h2>
                {availableBooks.length > 0 ? (
                  <>
                    <ul className="book-list">
                      {availableBooks.map(book => (
                        <li key={book._id}>
                          <span>{book.title} by {book.author} (${book.price})</span>
                          <button onClick={() => issueBook(book._id)}>Issue</button>
                        </li>
                      ))}
                    </ul>
                    <div className="pagination">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setPage(i + 1)}
                          className={page === i + 1 ? 'active' : ''}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>No available books to show.</p>
                )}
              </div>
            )}

            {/* Issued Books */}
            {activeTab === 'issued' && (
              <div className="issued-books-tab">
                <h2>Your Issued Books</h2>
                {issuedBooks.length > 0 ? (
                  <ul className="book-list">
                    {issuedBooks.map(book => (
                      <li key={book._id}>
                        <span>{book.title} by {book.author}</span>
                        <button onClick={() => returnBook(book._id)}>Return</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>You have not issued any books.</p>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
