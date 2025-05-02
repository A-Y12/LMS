// // import React, { useState } from 'react';
// // import './ChooseRole.css';  // Custom CSS for styling and parallax
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // function ChooseRole() {
// //   const [role, setRole] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   // Open the modal when either Admin or User is selected
// //   const handleRoleSelect = (role) => {
// //     console.log('Role selected:', role); // Debugging line
// //     setRole(role);
// //     setIsModalOpen(true); // Show modal
// //   };

// //   // Close modal
// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //   };

// //   // Handle form submission (login)
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     console.log('Submitting login with:', { username, password }); // Debugging line
// //     try {
// //       const response = await axios.post(`/api/auth/login`, { username, password });
// //       const { token } = response.data;
// //       // Store token in localStorage
// //       localStorage.setItem('token', token);

// //       // Redirect to appropriate dashboard based on role
// //       if (role === 'admin') {
// //         navigate('/admin-dashboard'); // Admin dashboard route
// //       } else {
// //         navigate('/user-dashboard'); // User dashboard route
// //       }
// //     } catch (err) {
// //       setError('Invalid credentials, please try again.');
// //       console.error('Login Error:', err.response?.data?.message || err.message);
// //     }
// //   };

// //   return (
// //     <div className="choose-role-container">
// //       <div className="parallax-background">
// //         <div className="overlay">
// //           <div className="content">
// //             <h1 className="headline">Choose Your Role</h1>
// //             <p className="subtext">"Ready to dive into the world of books? Pick your role and let's turn this library adventure up a notch!".</p>
// //             <div className="buttons">
// //               <button className="role-button admin-button" onClick={() => handleRoleSelect('admin')}>
// //                 Admin
// //               </button>
// //               <button className="role-button user-button" onClick={() => handleRoleSelect('user')}>
// //                 User
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modal for Sign-In */}
// //       {isModalOpen && (
// //         <div className="modal">
// //           <div className="modal-content">
// //             <h2>Sign In as {role}</h2>
// //             <form onSubmit={handleLogin}>
// //               <input
// //                 type="text"
// //                 placeholder="Username"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 required
// //               />
// //               <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //               <button type="submit">Log In</button>
// //             </form>
// //             {error && <div className="error-message">{error}</div>}
// //             <button onClick={closeModal}>Close</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default ChooseRole;
// import React, { useState } from 'react';
// import './ChooseRole.css'; // Ensure your CSS has styling for modal
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function ChooseRole() {
//   const [role, setRole] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle role selection and open modal
//   const handleRoleSelect = (selectedRole) => {
//     setRole(selectedRole);
//     setIsModalOpen(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setUsername('');
//     setPassword('');
//     setError('');
//   };

//   // Handle login form submission
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const response = await axios.post(`/api/auth/login`, {
//         username,
//         password,
//         role, // Include role in the request for backend validation
//       });

//       const { token } = response.data;
//       localStorage.setItem('token', token); // Store JWT token

//       // Redirect to appropriate dashboard
//       if (role === 'admin') {
//         navigate('/admin-dashboard');
//       } else {
//         navigate('/user-dashboard');
//       }
//     } catch (err) {
//       setError('Invalid credentials, please try again.');
//       console.error('Login Error:', err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="choose-role-container">
//       <div className="parallax-background">
//         <div className="overlay">
//           <div className="content">
//             <h1 className="headline">Choose Your Role</h1>
//             <p className="subtext">
//               "Ready to dive into the world of books? Pick your role and let's turn this library adventure up a notch!"
//             </p>
//             <div className="buttons">
//               <button className="role-button admin-button" onClick={() => handleRoleSelect('admin')}>
//                 Admin
//               </button>
//               <button className="role-button user-button" onClick={() => handleRoleSelect('user')}>
//                 User
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal for Sign-In */}
//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
//             <form onSubmit={handleLogin}>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button type="submit" disabled={loading}>
//                 {loading ? 'Logging in...' : 'Log In'}
//               </button>
//             </form>
//             {error && <div className="error-message">{error}</div>}
//             <button className="close-button" onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChooseRole;
import React, { useState } from 'react';
import './ChooseRole.css';  // Custom CSS for styling and parallax
import Modal from './SignInModal';  // Import modal component
import { useNavigate } from 'react-router-dom';

function ChooseRole() {
  const [role, setRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Open the modal when either Admin or User is selected
  const handleRoleSelect = (role) => {
    setRole(role);
    setIsModalOpen(true); // Show modal
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="choose-role-container">
      <div className="parallax-background">
        <div className="overlay">
          <div className="content">
            <h1 className="headline">Choose Your Role</h1>
            <p className="subtext">"Ready to dive into the world of books? Pick your role and let's turn this library adventure up a notch!".</p>
            <div className="buttons">
              <button className="role-button admin-button" onClick={() => handleRoleSelect('admin')}>
                Admin
              </button>
              <button className="role-button user-button" onClick={() => handleRoleSelect('user')}>
                User
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Sign-In */}
      {isModalOpen && <Modal role={role} closeModal={closeModal} />}
    </div>
  );
}

export default ChooseRole;