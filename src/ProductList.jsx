import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

// Placeholder thumbnails that always load. Swap in real photo links later if you like.
const img = (name, color) =>
  `https://placehold.co/300x300/${color}/ffffff?text=${encodeURIComponent(name)}`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('Snake Plant', '2e7d32'), description: 'Produces oxygen at night.', cost: '$15' },
      { name: 'Spider Plant', image: img('Spider Plant', '2e7d32'), description: 'Filters formaldehyde and xylene.', cost: '$12' },
      { name: 'Peace Lily', image: img('Peace Lily', '2e7d32'), description: 'Removes mold spores from the air.', cost: '$18' },
      { name: 'Boston Fern', image: img('Boston Fern', '2e7d32'), description: 'Acts as a natural humidifier.', cost: '$20' },
      { name: 'Rubber Plant', image: img('Rubber Plant', '2e7d32'), description: 'Absorbs airborne chemicals.', cost: '$17' },
      { name: 'Aloe Vera', image: img('Aloe Vera', '2e7d32'), description: 'Purifies air and soothes burns.', cost: '$14' },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: img('Lavender', '6a1b9a'), description: 'Calming, soothing scent.', cost: '$20' },
      { name: 'Jasmine', image: img('Jasmine', '6a1b9a'), description: 'Sweet floral fragrance.', cost: '$18' },
      { name: 'Rosemary', image: img('Rosemary', '6a1b9a'), description: 'Fresh herbal aroma.', cost: '$15' },
      { name: 'Mint', image: img('Mint', '6a1b9a'), description: 'Refreshing and easy to grow.', cost: '$12' },
      { name: 'Lemon Balm', image: img('Lemon Balm', '6a1b9a'), description: 'Citrusy and calming.', cost: '$14' },
      { name: 'Hyacinth', image: img('Hyacinth', '6a1b9a'), description: 'Strong spring fragrance.', cost: '$22' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: img('ZZ Plant', 'e65100'), description: 'Thrives on neglect.', cost: '$25' },
      { name: 'Pothos', image: img('Pothos', 'e65100'), description: 'Tolerates low light.', cost: '$10' },
      { name: 'Cast Iron Plant', image: img('Cast Iron Plant', 'e65100'), description: 'Nearly indestructible.', cost: '$19' },
      { name: 'Jade Plant', image: img('Jade Plant', 'e65100'), description: 'Stores water in its leaves.', cost: '$16' },
      { name: 'Chinese Evergreen', image: img('Chinese Evergreen', 'e65100'), description: 'Handles low light well.', cost: '$21' },
      { name: 'Cactus', image: img('Cactus', 'e65100'), description: 'Needs minimal watering.', cost: '$9' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Remembers which plants were added (starts from what is already in the cart)
  const [addedToCart, setAddedToCart] = useState(() =>
    Object.fromEntries(cartItems.map((item) => [item.name, true]))
  );

  // Re-enable the button if a plant is removed from the cart
  useEffect(() => {
    setAddedToCart((prev) => {
      const updated = {};
      cartItems.forEach((item) => {
        updated[item.name] = true;
      });
      return updated;
    });
  }, [cartItems]);

  const calculateTotalQuantity = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🌿</span>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <a href="#" onClick={handleHomeClick}>Home</a>
          <a href="#" onClick={handlePlantsClick}>Plants</a>
          <a href="#" className="cart-link" onClick={handleCartClick}>
            🛒 Cart <span className="cart-count">{calculateTotalQuantity()}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <div key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-list category-row">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="price">{plant.cost}</p>
                    <button
                      className="add-to-cart-button"
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;