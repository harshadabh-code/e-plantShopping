import React from 'react';

function ProductList({ onHomeClick }) {
  return (
    <div style={{ padding: '20px' }}>
      <button onClick={onHomeClick}>Home</button>
      <h2>Product list coming soon</h2>
    </div>
  );
}

export default ProductList;