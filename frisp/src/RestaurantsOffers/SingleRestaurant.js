import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
const SingleRestaurant=()=>
{
    const {id}=useParams();
    const [restaurant,setRestaurant]=useState({})
    const [loading,setLoading]=useState(true)
    const fetchSingleRes= async()=>
    {
        await axios.get(`http://localhost:3000/restaurantData/${id}`)
        .then((res)=>{
         console.log("respo",res.data)
         setRestaurant(res.data)
         setLoading(false)
        })
        .catch((err)=>{
              console.log("errdddd",err)
              setLoading(false)
        })

    }
    useEffect(()=>{fetchSingleRes()},[id])
    return(
        <>
        {console.log("enna nee",restaurant)}
        {loading?
        (<p>LOADING.......</p>):(<div>
            <h2>{restaurant.id}</h2>
            <h2>{restaurant.rating}</h2>
            <img style={{height:"400px",width:"50%"}} src={restaurant.image}></img>
            
        </div>)
        }
        </>
    )
}
export default SingleRestaurant;