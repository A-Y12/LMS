
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import './AdminSignIn.css'; // Styled for professional look

// // // const AdminDashboard = () => {
// // //   const [books, setBooks] = useState([]);
// // //   const [users, setUsers] = useState([]);
// // //   const [bookForm, setBookForm] = useState({ title: '', author: '', price: '' });
// // //   const [userForm, setUserForm] = useState({ name: '', email: '', password: '' });
// // //   const [editingBook, setEditingBook] = useState(null);
// // //   const [editingUser, setEditingUser] = useState(null);
// // //   const [bookPage, setBookPage] = useState(1);
// // //   const [userPage, setUserPage] = useState(1);
// // //   const [netAmount, setNetAmount] = useState(0);
// // //   const [transactions, setTransactions] = useState([]);
// // //   const [page, setPage] = useState(1);
// // //   const [selectedMenu, setSelectedMenu] = useState('books');
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const [bookTotalPages, setBookTotalPages] = useState(1);
// // //   const [userTotalPages, setUserTotalPages] = useState(1);

// // //   // useEffect(() => {
// // //   //   fetchBooks(bookPage);
// // //   //   fetchUsers(userPage);
// // //   //   fetchTransactions(page);
// // //   // }, [bookPage, userPage, page]);
// // //   useEffect(() => {
// // //     if (selectedMenu === 'books') {
// // //       fetchBooks();
// // //     } else if (selectedMenu === 'users') {
// // //       fetchUsers();
// // //     } else if (selectedMenu === 'transactions') {
// // //       fetchTransactions();
// // //     }
// // //   }, [selectedMenu]);

// // //   const fetchTransactions = async (page) => {
// // //     try {
// // //       const res = await axios.get(`http://localhost:5000/api/transactions?page=${page}&limit=2`);
// // //       setTransactions(res.data.transactions || []);
// // //       setTotalPages(res.data.totalPages || 1);

// // //       // Calculate the net transaction amount (issue adds, return deducts)
// // //       const total = res.data.transactions.reduce((acc, transaction) => {
// // //         const amount = transaction.amount ||0;
// // //         return transaction.type === 'issue' ? acc + amount : acc - amount;
// // //       }, 0);
// // //       setNetAmount(total);
// // //     } catch (error) {
// // //       console.error('Error fetching transactions:', error);
// // //       setTransactions([]); // Clear transactions on error
// // //     }
// // //   };

// // //   const deleteTransaction = async (id) => {
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/transactions/${id}`);
// // //       // After deleting, update the transaction list
// // //       setTransactions(transactions.filter(transaction => transaction._id !== id));
// // //     } catch (error) {
// // //       console.error('Error deleting transaction:', error);
// // //     }
// // //   };
  

// // //   // Fetch paginated books
// // //   const fetchBooks = async (page) => {
// // //     try {
// // //       const res = await axios.get(`http://localhost:5000/api/books?page=${page}&limit=5`);
// // //       setBooks(res.data.books || []);
// // //       setBookTotalPages(res.data.totalPages || 1);
// // //     } catch (error) {
// // //       console.error('Error fetching books:', error);
// // //       setBooks([]); // Clear books on error
// // //     }
// // //   };

// // //   // Fetch paginated users
// // //   const fetchUsers = async (page) => {
// // //     try {
// // //       const res = await axios.get(`http://localhost:5000/api/users?page=${page}&limit=5`);
// // //       setUsers(res.data.users || []);
// // //       setUserTotalPages(res.data.totalPages || 1);
// // //     } catch (error) {
// // //       console.error('Error fetching users:', error);
// // //       setUsers([]); // Clear users on error
// // //     }
// // //   };

// // //   // Handle book form submit
// // //   const handleBookSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       if (editingBook) {
// // //         await axios.put(`http://localhost:5000/api/books/${editingBook._id}`, bookForm);
// // //       } else {
// // //         await axios.post('http://localhost:5000/api/books', bookForm);
// // //       }
// // //       fetchBooks(bookPage);
// // //       setEditingBook(null);
// // //       setBookForm({ title: '', author: '', price: '' });
// // //     } catch (error) {
// // //       console.error('Error submitting book:', error);
// // //     }
// // //   };

// // //   // Handle user form submit
// // //   const handleUserSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       if (editingUser) {
// // //         await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, userForm);
// // //       } else {
// // //         await axios.post('http://localhost:5000/api/users', userForm);
// // //       }
// // //       fetchUsers(userPage);
// // //       setEditingUser(null);
// // //       setUserForm({ name: '', email: '', password: '' });
// // //     } catch (error) {
// // //       console.error('Error submitting user:', error);
// // //     }
// // //   };

// // //   // Delete a book
// // //   const deleteBook = async (id) => {
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/books/${id}`);
// // //       fetchBooks(bookPage);
// // //     } catch (error) {
// // //       console.error('Error deleting book:', error);
// // //     }
// // //   };

// // //   // Delete a user
// // //   const deleteUser = async (id) => {
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/users/${id}`);
// // //       fetchUsers(userPage);
// // //     } catch (error) {
// // //       console.error('Error deleting user:', error);
// // //     }
// // //   };

// // //   // Edit book details
// // //   const editBook = (book) => {
// // //     setEditingBook(book);
// // //     setBookForm({ title: book.title, author: book.author, price: book.price });
// // //   };

// // //   // Edit user details
// // //   const editUser = (user) => {
// // //     setEditingUser(user);
// // //     setUserForm({ name: user.name, email: user.email });
// // //   };

// // //   return (
// // //     <div className="admin-dashboard-container">
// // //       <header className="admin-header">
// // //         <h1>Admin Dashboard</h1>
// // //       </header>
      
// // //       <section>
// // //         <h2>Net Transactions</h2>
// // //         <p>Total Net Amount: ${netAmount}</p>
// // //       </section>

// // //       {/* Transaction History Section */}
// // //       {/* <section>
// // //         <h2>Transaction History</h2>
// // //         <ul>
// // //   {transactions.length > 0 ? (
// // //     transactions.map(transaction => (
// // //       <li key={transaction._id}>
// // //         {transaction.type === 'issue' ? 'Issued' : 'Returned'}: 
// // //         {transaction.book?.title || 'Unknown Book'} (${transaction.amount || 0}) by {transaction.user?.name || 'Unknown User'}
// // //         <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
// // //       </li>
// // //     ))
// // //   ) : (
// // //     <p>No transactions available</p>
// // //   )}
// // // </ul> */}

// // //         {/* <ul>
// // //           {transactions.length > 0 ? (
// // //             transactions.map(transaction => (
// // //               <li key={transaction._id}>
// // //                 {transaction.type === 'issue' ? 'Issued' : 'Returned'}: 
// // //                 {transaction.book?.title || 'Unknown Book'} (${transaction.amount}) by {transaction.user?.name || 'Unknown User'}
// // //               </li>
// // //             ))
// // //           ) : (
// // //             <p>No transactions available</p>
// // //           )}
// // //         </ul> */}
// // //         {/* <div className="pagination">
// // //           {Array.from({ length: totalPages }, (_, i) => (
// // //             <button key={i + 1} onClick={() => setPage(i + 1)}>{i + 1}</button>
// // //           ))}
// // //         </div>
// // //       </section> */}

// // //       {/* Books Section */}
// // //       <div className="section">
// // //         <h2>{editingBook ? 'Edit Book' : 'Add Book'}</h2>
// // //         <form onSubmit={handleBookSubmit} className="form">
// // //           <input
// // //             type="text"
// // //             placeholder="Title"
// // //             value={bookForm.title}
// // //             onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
// // //           />
// // //           <input
// // //             type="text"
// // //             placeholder="Author"
// // //             value={bookForm.author}
// // //             onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
// // //           />
// // //           <input
// // //             type="number"
// // //             placeholder="Price"
// // //             value={bookForm.price}
// // //             onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })}
// // //           />
// // //           <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
// // //         </form>

// // //         <ul>
// // //           {books.length > 0 ? (
// // //             books.map(book => (
// // //               <li key={book._id}>
// // //                 {book.title} by {book.author} (${book.price})
// // //                 <button onClick={() => editBook(book)}>Edit</button>
// // //                 <button onClick={() => deleteBook(book._id)}>Delete</button>
// // //               </li>
// // //             ))
// // //           ) : (
// // //             <li>No books available</li>
// // //           )}
// // //         </ul>

// // //         <div className="pagination">
// // //           {Array.from({ length: bookTotalPages }, (_, i) => (
// // //             <button key={i + 1} onClick={() => setBookPage(i + 1)}>{i + 1}</button>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Users Section */}
// // //       <div className="section">
// // //         <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
// // //         <form onSubmit={handleUserSubmit} className="form">
// // //           <input
// // //             type="text"
// // //             placeholder="Name"
// // //             value={userForm.name}
// // //             onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
// // //           />
// // //           <input
// // //             type="email"
// // //             placeholder="Email"
// // //             value={userForm.email}
// // //             onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
// // //           />
// // //           <input
// // //             type="password"
// // //             placeholder="Password"
// // //             value={userForm.password}
// // //             onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
// // //           />
// // //           <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
// // //         </form>

// // //         <ul>
// // //           {users.length > 0 ? (
// // //             users.map(user => (
// // //               <li key={user._id}>
// // //                 {user.name} - {user.email}
// // //                 <button onClick={() => editUser(user)}>Edit</button>
// // //                 <button onClick={() => deleteUser(user._id)}>Delete</button>
// // //               </li>
// // //             ))
// // //           ) : (
// // //             <li>No users available</li>
// // //           )}
// // //         </ul>

// // //         <div className="pagination">
// // //           {Array.from({ length: userTotalPages }, (_, i) => (
// // //             <button key={i + 1} onClick={() => setUserPage(i + 1)}>{i + 1}</button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminDashboard;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './AdminSignIn.css';

// // const AdminDashboard = () => {
  
// // //   const [users, setUsers] = useState([]);
// //  const [bookForm, setBookForm] = useState({ title: '', author: '', price: '' });
// //   const [userForm, setUserForm] = useState({ name: '', email: '', password: '' });
// //  const [editingBook, setEditingBook] = useState(null);
// //    const [editingUser, setEditingUser] = useState(null);
// // //   const [bookPage, setBookPage] = useState(1);
// // //   const [userPage, setUserPage] = useState(1);
// // //   const [netAmount, setNetAmount] = useState(0);
// // //   const [transactions, setTransactions] = useState([]);
// // //   const [page, setPage] = useState(1);
// // //   const [selectedMenu, setSelectedMenu] = useState('books');
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const [bookTotalPages, setBookTotalPages] = useState(1);
// // //   const [userTotalPages, setUserTotalPages] = useState(1);

// //   const [books, setBooks] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [transactions, setTransactions] = useState([]);
// //   const [netAmount, setNetAmount] = useState(0);
// //   const [selectedMenu, setSelectedMenu] = useState('books');

// //   const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });
// //   const [newUser, setNewUser] = useState({ name: '', email: '' });

// //   useEffect(() => {
// //     if (selectedMenu === 'books') {
// //       fetchBooks();
// //     } else if (selectedMenu === 'users') {
// //       fetchUsers();
// //     } else if (selectedMenu === 'transactions') {
// //       fetchTransactions();
// //     }
// //   }, [selectedMenu]);

// //   const fetchBooks = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/books');
// //       setBooks(res.data.books || []);
// //     } catch (error) {
// //       console.error('Error fetching books:', error);
// //       setBooks([]);
// //     }
// //   };

// //   const fetchUsers = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/users');
// //       setUsers(res.data.users || []);
// //     } catch (error) {
// //       console.error('Error fetching users:', error);
// //       setUsers([]);
// //     }
// //   };

// //   const fetchTransactions = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/transactions');
// //       setTransactions(res.data.transactions || []);
// //       const total = res.data.transactions.reduce((acc, transaction) => {
// //         return transaction.type === 'issue' ? acc + transaction.amount : acc - transaction.amount;
// //       }, 0);
// //       setNetAmount(total);
// //     } catch (error) {
// //       console.error('Error fetching transactions:', error);
// //     }
// //   };

// //   const handleMenuClick = (menu) => {
// //     setSelectedMenu(menu);
// //   };

// //   // Add new book
// //   const handleBookSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('http://localhost:5000/api/books', newBook);
// //       setNewBook({ title: '', author: '', price: '' });
// //       fetchBooks(); // Refresh the book list
// //     } catch (error) {
// //       console.error('Error adding new book:', error);
// //     }
// //   };

// //   // Add new user
// //   const handleUserSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('http://localhost:5000/api/users', newUser);
// //       setNewUser({ name: '', email: '' });
// //       fetchUsers(); // Refresh the user list
// //     } catch (error) {
// //       console.error('Error adding new user:', error);
// //     }
// //   };

// //   // // Edit and Delete Handlers
// //   // const handleEditBook = (book) => {
// //   //     setEditingBook(book);
// //   //     setBookForm({ title: book.title, author: book.author, price: book.price });
         
// //   // };
// //   const editBook = (book) => {
// //      setEditingBook(book);
// //      setBookForm({ title: book.title, author: book.author, price: book.price });
// //       };
    
// //     //   Edit user details
// //     const editUser = (user) => {
// //       setEditingUser(user);
// //        setUserForm({ name: user.name, email: user.email });
// //       };
    

// //   const handleDeleteBook = async (bookId) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/books/${bookId}`);
// //       fetchBooks(); // Refresh the book list
// //     } catch (error) {
// //       console.error('Error deleting book:', error);
// //     }
// //   };

// //   // const handleEditUser = (user) => {
// //   //   // Implement edit functionality for users
// //   //   const updatedName = prompt('Edit User Name', user.name);
// //   //   if (updatedName) {
// //   //     // Update the user in the database
// //   //   }
// //   // };

// //   const handleDeleteUser = async (userId) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/users/${userId}`);
// //       fetchUsers(); // Refresh the user list
// //     } catch (error) {
// //       console.error('Error deleting user:', error);
// //     }
// //   };

// //   return (
// //     <div className="admin-dashboard-container">
// //       <aside className="sidebar">
// //         <ul>
// //           <li onClick={() => handleMenuClick('books')} className={selectedMenu === 'books' ? 'active' : ''}>Books</li>
// //           <li onClick={() => handleMenuClick('users')} className={selectedMenu === 'users' ? 'active' : ''}>Users</li>
// //           <li onClick={() => handleMenuClick('transactions')} className={selectedMenu === 'transactions' ? 'active' : ''}>Transactions</li>
// //         </ul>
// //       </aside>
// //       <main className="content">
// //         {selectedMenu === 'books' && (
// //           <div className="section">
// //             <h2>Books</h2>
// //             <form onSubmit={handleBookSubmit}>
// //               <input
// //                 type="text"
// //                 placeholder="Book Title"
// //                 value={newBook.title}
// //                 onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
// //                 required
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Author"
// //                 value={newBook.author}
// //                 onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
// //                 required
// //               />
// //               <input
// //                 type="number"
// //                 placeholder="Price"
// //                 value={newBook.price}
// //                 onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
// //                 required
// //               />
// //               <button type="submit">Add Book</button>
// //             </form>
// //             <ul>
// //               {books.length > 0 ? (
// //                 books.map(book => (
// //                   <li key={book._id}>
// //                     {book.title} by {book.author} (${book.price})
// //                     <div className="item-actions">
// //                       <button className="edit-button" onClick={() => editBook(book)}>Edit</button>
// //                       <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
// //                     </div>
// //                   </li>
// //                 ))
// //               ) : (
// //                 <li>No books available</li>
// //               )}
// //             </ul>
// //           </div>
// //         )}
// //         {selectedMenu === 'users' && (
// //           <div className="section">
// //             <h2>Users</h2>
// //             <form onSubmit={handleUserSubmit}>
// //               <input
// //                 type="text"
// //                 placeholder="User Name"
// //                 value={newUser.name}
// //                 onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
// //                 required
// //               />
// //               <input
// //                 type="email"
// //                 placeholder="User Email"
// //                 value={newUser.email}
// //                 onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
// //                 required
// //               />
// //               <input
// //              type="password" 
// //             placeholder="Password"
// //             value={newUser.password}
// //             onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
// //           />
// //               <button type="submit">Add User</button>
// //             </form>
// //             <ul>
// //               {users.length > 0 ? (
// //                 users.map(user => (
// //                   <li key={user._id}>
// //                     {user.name} - {user.email}
// //                     <div className="item-actions">
// //                       <button className="edit-button" onClick={() => editUser(user)}>Edit</button>
// //                       <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
// //                     </div>
// //                   </li>
// //                 ))
// //               ) : (
// //                 <li>No users available</li>
// //               )}
// //             </ul>
// //           </div>
// //         )}
// //         {selectedMenu === 'transactions' && (
// //           <div className="section">
// //             <h2>Net Transactions</h2>
// //             <p>Total Net Amount: ${netAmount}</p>
// //             <h2>Transaction History</h2>
// //             <ul>
// //               {transactions.length > 0 ? (
// //                 transactions.map(transaction => (
// //                   <li key={transaction._id}>
// //                     {transaction.type === 'issue' ? 'Issued' : 'Returned'}: 
// //                     {transaction.book?.title || 'Unknown Book'} 
// //                     (${transaction.amount}) by {transaction.user?.name || 'Unknown User'}
// //                   </li>
// //                 ))
// //               ) : (
// //                 <li>No transactions available</li>
// //               )}
// //             </ul>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AdminSignIn.css';

// const AdminDashboard = () => {
//   const [books, setBooks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [netAmount, setNetAmount] = useState(0);
//   const [selectedMenu, setSelectedMenu] = useState('books');
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });
//   const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

//   const [editBookId, setEditBookId] = useState(null);
//   const [editUserId, setEditUserId] = useState(null);

//   const [editBookData, setEditBookData] = useState({ title: '', author: '', price: '' });
//   const [editUserData, setEditUserData] = useState({ name: '', email: '' });
//   useEffect(() => {
//     if (selectedMenu === 'books') {
//       fetchBooks();
//     } else if (selectedMenu === 'users') {
//       fetchUsers();
//     } else if (selectedMenu === 'transactions') {
//       fetchTransactions();
//     }
//   }, [selectedMenu, currentPage]);

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/books');
//       setBooks(res.data.books || []);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/users');
//       setUsers(res.data.users || []);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const fetchTransactions = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/transactions');
//       setTransactions(res.data.transactions || []);
//       const total = res.data.transactions.reduce((acc, transaction) => {
//         return transaction.type === 'issue' ? acc + transaction.amount : acc - transaction.amount;
//       }, 0);
//       setNetAmount(total);
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//     setCurrentPage(1); // Reset to the first page when changing menu
//   };

//   // Pagination helper
//   const paginate = (items) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return items.slice(startIndex, startIndex + itemsPerPage);
//   };

//   // Add new book
//   const handleBookSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/books', newBook);
//       setNewBook({ title: '', author: '', price: '' });
//       fetchBooks();
//     } catch (error) {
//       console.error('Error adding new book:', error);
//     }
//   };

//   // Add new user
//   const handleUserSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/users', newUser);
//       setNewUser({ name: '', email: '', password: '' });
//       fetchUsers();
//     } catch (error) {
//       console.error('Error adding new user:', error);
//     }
//   };

//   // Edit and Delete Handlers
//   // const handleEditBook = async (bookId, updatedBookData) => {
//   //   try {
//   //     await axios.put(`http://localhost:5000/api/books/${bookId}`, updatedBookData);
//   //     fetchBooks();
//   //   } catch (error) {
//   //     console.error('Error updating book:', error);
//   //   }
//   // };
//   const handleEditBook = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/books/${editBookId}`, editBookData);
//       setEditBookId(null);
//       setEditBookData({ title: '', author: '', price: '' });
//       fetchBooks();
//     } catch (error) {
//       console.error('Error updating book:', error);
//     }
//   };


//   const handleDeleteBook = async (bookId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/books/${bookId}`);
//       fetchBooks();
//     } catch (error) {
//       console.error('Error deleting book:', error);
//     }
//   };

//   // const handleEditUser = async (userId, updatedUserData) => {
//   //   try {
//   //     await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUserData);
//   //     fetchUsers();
//   //   } catch (error) {
//   //     console.error('Error updating user:', error);
//   //   }
//   // };
//   const handleEditUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/users/${editUserId}`, editUserData);
//       setEditUserId(null);
//       setEditUserData({ name: '',email:'', password: ''});
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/users/${userId}`);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   // Page change handlers
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Pagination controls
//   const renderPagination = (totalItems) => {
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
//     return (
//       <div className="pagination">
//         {pageNumbers.map((number) => (
//           <button key={number} onClick={() => handlePageChange(number)}>
//             {number}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <aside className="sidebar">
//         <ul>
//           <li onClick={() => handleMenuClick('books')} className={selectedMenu === 'books' ? 'active' : ''}>Books</li>
//           <li onClick={() => handleMenuClick('users')} className={selectedMenu === 'users' ? 'active' : ''}>Users</li>
//           <li onClick={() => handleMenuClick('transactions')} className={selectedMenu === 'transactions' ? 'active' : ''}>Transactions</li>
//         </ul>
//       </aside>
//       <main className="content">
//         {selectedMenu === 'books' && (
//           <div className="section">
//             <h2>Books</h2>
//             <form onSubmit={handleBookSubmit}>
//               <input
//                 type="text"
//                 placeholder="Book Title"
//                 value={newBook.title}
//                 onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Author"
//                 value={newBook.author}
//                 onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 value={newBook.price}
//                 onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
//                 required
//               />
//               <button type="submit">Add Book</button>
//             </form>
//             <ul>
//               {books.length > 0 ? (
//                 paginate(books).map(book => (
//                   <li key={book._id}>
//                     {book.title} by {book.author} (${book.price})
//                     <div className="item-actions">
//                      {/* <button className="edit-button" onClick={() => handleEditBook(book._id, { title: 'Updated Title', author: 'Updated Author', price: 25 })}>Edit</button> */}
//                      <button className="edit-button" onClick={() => {
//                         setEditBookId(book._id);
//                         setEditBookData({ title: book.title, author: book.author, price: book.price });
//                       }}>Edit</button>
//                       <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li>No books available</li>
//               )}
//             </ul>
//             {renderPagination(books.length)}
//           </div>
//         )}

//         {selectedMenu === 'users' && (
//           <div className="section">
//             <h2>Users</h2>
//             <form onSubmit={handleUserSubmit}>
//               <input
//                 type="text"
//                 placeholder="User Name"
//                 value={newUser.name}
//                 onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="User Email"
//                 value={newUser.email}
//                 onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={newUser.password}
//                 onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//                 required
//               />
//               <button type="submit">Add User</button>
//             </form>
//             <ul>
//               {users.length > 0 ? (
//                 paginate(users).map(user => (
//                   <li key={user._id}>
//                     {user.name} - {user.email}
//                     <div className="item-actions">
//                     <button className="edit-button" onClick={() => {
//                         setEditUserId(user._id);
//                         setEditUserData({ name: user.name, email: user.email });
//                       }}>Edit</button>
//                       {/* <button className="edit-button" onClick={() => handleEditUser(user._id, { name: 'Updated Name', email: 'updatedemail@example.com' })}>Edit</button> */}
//                       <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
//                     </div>
//                   </li>
//                 ))
//               ) : (
//                 <li>No users available</li>
//               )}
//             </ul>
//             {renderPagination(users.length)}
//           </div>
//         )}

//         {selectedMenu === 'transactions' && (
//           <div className="section">
//             <h2>Net Transactions</h2>
//             <p>Total Net Amount: ${netAmount}</p>
//             <h2>Transaction History</h2>
//             <ul>
//               {transactions.length > 0 ? (
//                 paginate(transactions).map(transaction => (
//                   <li key={transaction._id}>
//                     {transaction.bookTitle} - {transaction.type} - ${transaction.amount}
//                   </li>
//                 ))
//               ) : (
//                 <li>No transactions available</li>
//               )}
//             </ul>
//             {renderPagination(transactions.length)}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSignIn.css'

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [netAmount, setNetAmount] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState('books');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [formBook, setFormBook] = useState({ title: '', author: '', price: '' });
  const [formUser, setFormUser] = useState({ name: '', email: '', password: '' });

  const [isEditingBook, setIsEditingBook] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editBookId, setEditBookId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    if (selectedMenu === 'books') {
      fetchBooks();
    } else if (selectedMenu === 'users') {
      fetchUsers();
    } else if (selectedMenu === 'transactions') {
      fetchTransactions();
    }
  }, [selectedMenu, currentPage]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data.books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(res.data.transactions || []);
      const total = res.data.transactions.reduce((acc, transaction) => {
        return transaction.type === 'issue' ? acc + transaction.amount : acc - transaction.amount;
      }, 0);
      setNetAmount(total);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setCurrentPage(1); // Reset to the first page when changing menu
  };

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditingBook) {
        await axios.put(`http://localhost:5000/api/books/${editBookId}`, formBook);
        setIsEditingBook(false);
        setEditBookId(null);
      } else {
        await axios.post('http://localhost:5000/api/books', formBook);
      }
      setFormBook({ title: '', author: '', price: '' });
      fetchBooks();
    } catch (error) {
      console.error('Error adding/updating book:', error);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditingUser) {
        await axios.put(`http://localhost:5000/api/users/${editUserId}`, formUser);
        setIsEditingUser(false);
        setEditUserId(null);
      } else {
        await axios.post('http://localhost:5000/api/users', formUser);
      }
      setFormUser({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error adding/updating user:', error);
    }
  };

  const handleEditBook = (book) => {
    setIsEditingBook(true);
    setEditBookId(book._id);
    setFormBook({ title: book.title, author: book.author, price: book.price });
  };

  const handleEditUser = (user) => {
    setIsEditingUser(true);
    setEditUserId(user._id);
    setFormUser({ name: user.name, email: user.email, password: user.password }); // Don't pre-fill the password
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const renderPagination = (totalItems) => {
  //   const totalPages = Math.ceil(totalItems / itemsPerPage);
  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  //   }
  //   return (
  //     <div className="pagination">
  //       {pageNumbers.map((number) => (
  //         <button key={number} onClick={() => handlePageChange(number)}>
  //           {number}
  //         </button>
  //       ))}
  //     </div>
  //   );
  // };
  const renderPagination = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total number of pages
  
    if (totalPages <= 1) {
      return null; // If there is only one page, no need for pagination buttons
    }
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    );
  };
  

  return (
    <div className="admin-dashboard-container">
      <aside className="sidebar">
        <ul>
          <li onClick={() => handleMenuClick('books')} className={selectedMenu === 'books' ? 'active' : ''}>Books</li>
          <li onClick={() => handleMenuClick('users')} className={selectedMenu === 'users' ? 'active' : ''}>Users</li>
          <li onClick={() => handleMenuClick('transactions')} className={selectedMenu === 'transactions' ? 'active' : ''}>Transactions</li>
        </ul>
      </aside>
      <main className="content">
        {selectedMenu === 'books' && (
          <div className="section">
            <h2>{isEditingBook ? 'Edit Book' : 'Add Book'}</h2>
            <form onSubmit={handleBookSubmit}>
              <input
                type="text"
                placeholder="Book Title"
                value={formBook.title}
                onChange={(e) => setFormBook({ ...formBook, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={formBook.author}
                onChange={(e) => setFormBook({ ...formBook, author: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formBook.price}
                onChange={(e) => setFormBook({ ...formBook, price: e.target.value })}
                required
              />
              <button type="submit">{isEditingBook ? 'Update Book' : 'Add Book'}</button>
              {isEditingBook && <button onClick={() => setIsEditingBook(false)}>Cancel</button>}
            </form>

            <ul>
              {books.length > 0 ? (
                paginate(books).map(book => (
                  <li key={book._id}>
                    {book.title} by {book.author} (${book.price})
                    <div className="item-actions">
                      <button onClick={() => handleEditBook(book)}>Edit</button>
                      <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                    </div>
                  </li>
                ))
              ) : (
                <li>No books available</li>
              )}
            </ul>
            {renderPagination(books.length)}
          </div>
        )}

        {selectedMenu === 'users' && (
          <div className="section">
            <h2>{isEditingUser ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleUserSubmit}>
              <input
                type="text"
                placeholder="User Name"
                value={formUser.name}
                onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formUser.email}
                onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                required
              />
              {/* {!isEditingUser && ( */}
                <input
                  type="password"
                  placeholder="Password"
                  value={formUser.password}
                  onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                  required
                />
              {/* )} */}
              <button type="submit">{isEditingUser ? 'Update User' : 'Add User'}</button>
              {isEditingUser && <button onClick={() => setIsEditingUser(false)}>Cancel</button>}
            </form>

            <ul>
              {users.length > 0 ? (
                paginate(users).map(user => (
                  <li key={user._id}>
                    {user.name} ({user.email})
                    <div className="item-actions">
                      <button onClick={() => handleEditUser(user)}>Edit</button>
                      <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </div>
                  </li>
                ))
              ) : (
                <li>No users available</li>
              )}
            </ul>
            {renderPagination(users.length)}
          </div>
        )}

        {selectedMenu === 'transactions' && (
          <div className="section">
            <h2>Transactions</h2>
            <p>Net Amount: ${netAmount}</p>
            <ul>
              {transactions.length > 0 ? (
                paginate(transactions).map(transaction => (
                  <li key={transaction._id}>
                    {transaction.book} - {transaction.user.name} - {transaction.amount}
                  </li>
                ))
              ) : (
                <li>No transactions available</li>
              )}
            </ul>
            {renderPagination(transactions.length)}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
