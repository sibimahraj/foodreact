
// import React, { useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';
// import HotelMenuComponent from '../hotelmenu';
// import { useNavigate } from 'react-router-dom';
// // import './Con&foot.css';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// const Container = () => {

//     const [Array, setArray] = useState([])
//     const [numItemsToShow, setNumItemsToShow] = useState(12)
//     const [viewMenuItem, setviewMenuItem] = useState(false)

//     const navigate = useNavigate()



//     useEffect(() => {
//         axios.get(' http://localhost:3000/restaurantData')
//             .then(res => setArray(res.data))
//             .catch(err => console.log(err))
//     }, [])
//     const showMenu = (id) => {
//         console.log("sibi",id)
//         navigate(`/menu/${id}`);
//     };

//     const ratingAbove = () => {
//         const sortedArray = [...Array].sort((a, b) => b.rating - a.rating);
//         setArray(sortedArray);

//     }
//     const handleShowMore = () => {
//         setNumItemsToShow(numItemsToShow + 12)
//     }


//     return (
//         <>
//             {!viewMenuItem &&
//                 <div className='container'>
//                     <div className='top'>
//                         {Array.slice(0, numItemsToShow).map((d, i) => {
//                             return (
//                                 <div className='res1' key={i}>
//                                     <div className='res2'>
//                                         <div className='res4'>
//                                             <img onClick={() => showMenu(d.id)} style={{ height: "100%", width: "100%" }} src={d.image} alt='' />
//                                         </div>
//                                         <div className='res3'>
//                                             <div className='hname'>{d.name}</div>
//                                             <div className='cuisine'>{d.cuisines}</div>
//                                         </div>
//                                         <div class="icons">
//                                             <div class="_str  " style={{ backgroundColor: d.rating < 4 ? "red" : "#48c479" }}>
//                                                 <span class="_star" >
//                                                     <FontAwesomeIcon icon={faStar} className='star' />
//                                                 </span>
//                                                 <span>{d.rating}</span>
//                                             </div>
//                                             <div>•</div>
//                                             <div>{d.dtime} MINS</div>
//                                             <div>•</div>
//                                             <div >{d.price} FOR TWO</div>
//                                         </div>
//                                         <div class="view">
//                                             <span role="button" className="_view _view1">Quick View</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>

//                 </div>
//             }
//             {!viewMenuItem && numItemsToShow < Array.length && (
//                 <div className='showmore'>
//                     <button onClick={handleShowMore} id='show'>Show More</button>
//                 </div>
//             )}



//         </>
//     )
// }

// export default Container;