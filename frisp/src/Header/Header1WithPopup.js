import React from 'react';
import Header1 from './Header1';
import './Header1.css';

const Header1WithPopup = () => {
  const [showPopup, setShowPopup] = React.useState(false);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Header1>
      <div
        className='Header1_inside_right Header1_inside_right_small'
        onMouseEnter={handleClick}
        onMouseLeave={() => setShowPopup(false)}
      >
        <span>
          <AddShoppingCartIcon/>
        </span>
        <span>Cart</span>
        {showPopup && (
          <div
            className='Header1_popup'
            onMouseDown={() => setShowPopup(false)}
          >
            Cart Empty
            Good food is always cooking! Go ahead, order some yummy items from the menu.
          </div>
        )}
      </div>
    </Header1>
  );
};

export default Header1WithPopup;
