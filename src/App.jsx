import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          <h1>Welcome To Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
          <AboutUs />
        </div>
      </div>

      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        {showProductList && <ProductList onHomeClick={handleHomeClick} />}
      </div>
    </div>
  );
}

export default App;