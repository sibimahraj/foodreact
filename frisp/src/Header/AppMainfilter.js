import React from 'react'



/* import HelpandSupport from './HelpandSupport/HelpandSupport'; */
import MainFilter from './MainFilter';
import { useState } from 'react';
function AppMainfilter() {
  const [showPopup, setShowPopup] = useState(false);
  /* const [helpandSupport, sethelpandSupport] = useState(false) */;
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
 /*  const openHelpandSupportPopup = () => {
    sethelpandSupport(true);
  }; */
  return (
    <>
      <button onClick={openPopup}>Filters</button>
      <MainFilter/>
      {/* <button onClick={openHelpandSupportPopup}>Help & Support</button>
      {!helpandSupport && <Container />}
      {!helpandSupport && <Footer />}

      {showPopup && <MainFilter cuisines={cuisines} onClose={closePopup} />}
      {helpandSupport && <HelpandSupport></HelpandSupport>} */}
     {/*  <Footer /> */}
    </>
  )
}

export default AppMainfilter;