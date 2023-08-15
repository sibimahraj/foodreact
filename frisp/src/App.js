import React from 'react'
import {createBrowserRouter,RouterProvider,BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Footer from './Footer'
import Offers from './RestaurantsOffers/Offers';
import SingleRestaurant from './RestaurantsOffers/SingleRestaurant'
import SearchPage from './SearchFolder/SearchPage';
import CuisinePage from './RestaurantsOffers/CuisinePage';
import MainHeader from './Header/MainHeader.js'
import HelpandSupport from './HelpandSupport/HelpandSupport'
import HotelMenuComponent from './hotelmenu';
import Cart from './cart/cartPage'
import Apps from './App.css'


function App() {
  // const linkRouter=createBrowserRouter([
  //   {path:'/',element:<MainHeader/>},
  //   {path:'/offer',element:<Offers/>},
  //   {path:'/restaurant/:id',element:<SingleRestaurant/>},
  //   {path:'/search',element:<SearchPage/>},
  //   {path:'/filtered/:cuisine',element:<CuisinePage/>},
  //   {path:'/HelpandSupport',element:<HelpandSupport/>}
  // ])
  return (
   <> 
     
     {/* <RouterProvider  router={linkRouter}></RouterProvider> */}

     <Router>

             <Routes>
               <Route path="/" element={<MainHeader/>} />
               {/* <Route path="/" element={<HotelMenuComponent/>} /> */}

               <Route path="/offer" element={<Offers/>} />
               <Route path='/restaurant/:id' element={<SingleRestaurant/>}/>
               <Route path='/search' element={<SearchPage/>} />
               <Route path="'/filtered/:cuisine" element={<CuisinePage/>} />
               <Route path="/HelpandSupport" element={<HelpandSupport/>} />
    
               {/* <Route path="/HotelMenuComponent" element={<HotelMenuComponent/>}/> */}
               <Route path="/menu/:id" element={<HotelMenuComponent />} />
               <Route path="/cart" element={<Cart/>}/>
               <Route path="/cart/:id" element={<Cart />} />
              <Route path="/cart/:id/:fid" element={<Cart />} />
             </Routes>
           </Router>
    <Footer/>
   </>
  )
}

export default App;


// const linkRouter=createBrowserRouter([
//   {path:'/',element:<MainHeader/>},
//   {path:'/offer',element:<Offers/>},
//   {path:'/restaurant/:id',element:<SingleRestaurant/>},
//   {path:'/search',element:<SearchPage/>},
//   {path:'/filtered/:cuisine',element:<CuisinePage/>},
//   {path:'/HelpandSupport',element:<HelpandSupport/>}
// ])
// return (
//  <> 
   
//    <RouterProvider  router={linkRouter}></RouterProvider>
//    <Footer/>
//  </>
// )