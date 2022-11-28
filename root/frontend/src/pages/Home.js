import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="about">Click to view our about page</Link>
    </div>
  );
}

export default Home;