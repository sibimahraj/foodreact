
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import './Con&foot.css';
// import './Contain/Con&foot.css'
import './Header/Container.css'
import { useNavigate } from 'react-router-dom';
import HotelMenuComponent from '../hotelmenu';

import axios from 'axios';

import { useHistory } from 'react-router-dom';
const Container = () => {
    const [Array, setArray] = useState([])
    const [numItemsToShow, setNumItemsToShow] = useState(12)
    const [viewMenuItem, setviewMenuItem] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:3000/restaurantData')
            .then(res => setArray(res.data))
            .catch(err => console.log(err))
    }, [])
    const showMenu = (id) => {
        // console.log(id,"pppppp")
        navigate(`/menu/${id}`);
    };
    const ratingAbove = () => {
        const sortedArray = [...Array].sort((a, b) => b.rating - a.rating);
        setArray(sortedArray);
    }
    const handleShowMore = () => {
        setNumItemsToShow(numItemsToShow + 12)
    }

    return (
        <>
            {!viewMenuItem &&
                <div className='container'>
                    <div className='top'>
                        {Array.slice(0, numItemsToShow).map((d, i) => {
                            return (
                                <div className='res1' key={i}>
                                    <div >
                                        <a className='anchor'>
                                            <div className='sibisupdate1'>
                                                <div className='sibisupdate2'>
                                                    <div className='sibisupdate3'>
                                                        <div className='sibisupdate4'>
                                                            <img onClick={() => showMenu(d.id)} src={d.image} />
                                                            <div className='sibisgrid'><div className='offer'>{d.offerRange}</div></div>
                                                        </div>
                                                    </div>
                                                    { /* <div className='res3'>
                                                        <div className='hname'>{d.name}</div>
                                                        <div className='cuisine'>{d.cuisines}</div>
                                                    </div>
                                                    <div class="icons">
                                                        <div class="_str _str1">
                                                            <span class="_star">
                                                                <FontAwesomeIcon icon={faStar} className='star' />
                                                            </span>
                                                            <span>{d.rating}</span>
                                                        </div>
                                                        <div>•</div>
                                                        <div>{d.dtime}MINS</div>
                                                        <div>•</div>
                                                        <div >{d.price} FOR TWO</div>
                                                    </div>
                                                    <div class="view">
                                                        <span role="button" className="_view _view1">Quick View</span>
                                                   </div>*/}
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>}
            {!viewMenuItem && numItemsToShow < Array.length && (
                <div className='showmore'>
                    <button onClick={handleShowMore} id='show'>Show More</button>
                </div>
            )}
        </>
    )
}

export default Container;