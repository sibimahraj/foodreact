import React from 'react'
import MainFilter from './MainFilter'
import { useState } from 'react';
function Appfilter(){
    const [showPopup, setShowPopup] = useState(false);
  
  const cuisines = [
    'American',
    'Andhra',
    'Arabian',
    'Asian',
    'Bakery',
    'Barbecue',
    'Bengali',
    'Beverages',
    'Biryani',
    'Burgers',
    'Cafe',
    'Chaat',
    'Chettinad',
    'Chinese',
    'Combo',
    'Continental',
    'Desserts',
    'European',
    'Fast Food',
    'Grill',
    'Gujarati',
    'Healthy Food',
    'Home Food',
    'Hyderabadi',
    'Ice Cream',
    'Ice Cream Cakes',
    'Indian',
    'Italian',
    'Japanese',
    'Juices',
    'Kebabs',
    'Kerala',
    'Keto',
    'Lebanese',
    'Lucknowi',
  ];
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

return(
    <>   <button onClick={openPopup}>Filters</button>

     {showPopup && <MainFilter cuisines={cuisines} onClose={closePopup} />}
    
    </>
)
}
export default Appfilter