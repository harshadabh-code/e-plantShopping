import React from 'react';

const CartItem = ({ onContinueShopping }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Cart page coming soon</h2>
      <button onClick={onContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default CartItem;