import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // "$15" -> 15
  const parseCost = (cost) => parseFloat(cost.substring(1));

  // Total cost for ONE plant (unit price x quantity)
  const calculateTotalCost = (item) => parseCost(item.cost) * item.quantity;

  // Total cost of the WHOLE cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Going below 1 removes the plant from the cart
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  const handleContinueShopping = (e) => {
  e.preventDefault();
  onContinueShopping(e);
};

  return (
    <div className="cart-container">
      <h2 className="total-amount">
        Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
      </h2>

      {cart.length === 0 && (
        <p className="empty-cart">Your cart is empty. Add some plants!</p>
      )}

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item).toFixed(2)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue-shopping-container">
  <button className="get-started-button" onClick={handleContinueShopping}>
    Continue Shopping
  </button>
  <button className="get-started-button1" onClick={handleCheckoutShopping}>
    Checkout
  </button>
</div>
    </div>
  );
};

export default CartItem;