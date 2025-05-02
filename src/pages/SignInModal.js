import React, { useState } from 'react';
import './SignInModal.css'; // Custom CSS for styling the modal
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInModal = ({ role, closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Please enter both username and password.');
      return;
    }

    try {
      if (role === 'admin') {
        // Admin credentials are hardcoded
        if (username === 'admin' && password === 'adminpass') {
          alert('Admin logged in successfully');
          navigate('/admin-dashboard');
          closeModal();
        } else {
          setError('Invalid admin credentials.');
        }
      } else if (role === 'user') {
        // Check user credentials against the database (username and email as password)
        const res = await axios.post('http://localhost:5000/api/users/signin', {
          password // Here password is the email added by admin
        });
        console.log("sent ")

        if (res.data) {
          alert('User logged in successfully');
          navigate('/user-dashboard', { state: { userId: res.data.user._id } }); // Pass userId to the user dashboard
          closeModal();
        } else {
          console.log("cant send");
          setError('Invalid user credentials.');
        }
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{role === 'admin' ? 'Admin' : 'User'} Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Sign In</button>
        </form>
        <button onClick={closeModal} className="close-modal-button">Close</button>
      </div>
    </div>
  );
};

export default SignInModal;
