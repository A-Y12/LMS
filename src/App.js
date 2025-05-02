// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
// import BookList from './pages/BookList';
// import UserList from './pages/UserList';
// import Transactions from './pages/Transactions';
// import AdminSignIn from './pages/AdminSignIn';
// import UserSignIn from './pages/UserSignIn';
// import ChooseRole from './pages/ChooseRole';
// import './App.css';

// // Private Route component for protecting routes
// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem('token');  // Check if user is authenticated
//   return isAuthenticated ? <Component {...rest} /> : <Navigate to="/choose-role" />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/books" element={<PrivateRoute element={BookList} />} />  {/* Protected */}
//         <Route path="/users" element={<PrivateRoute element={UserList} />} />  {/* Protected */}
//         <Route path="/transactions" element={<PrivateRoute element={Transactions} />} />  {/* Protected */}
//         <Route path="/admin-signin" element={<AdminSignIn />} />
//         <Route path="/user-signin" element={<UserSignIn />} />
//         <Route path="/choose-role" element={<ChooseRole />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ChooseRole from './pages/ChooseRole';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
