import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartExploring = () => {
    navigate('/choose-role');
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="content">
          <h1 className="headline">Welcome to the Digital Library</h1>
          <p className="subtext">
            Welcome to a library that never sleeps—your Digital Library awaits!
          </p>
          <button onClick={handleStartExploring}>Start Exploring</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
