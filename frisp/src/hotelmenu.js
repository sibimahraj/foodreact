import axios from "axios";
import React, { useEffect, useState } from "react";
import './hotel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const HotelMenuComponent = () => {
    const [array, setArray] = useState([]);
    const [array2, setArray2] = useState([])
    const { id, fid } = useParams();
    const [overlay, setOverlay] = useState(false)
    const [overlay2, setOverlay2] = useState(false)
    const [overlay3, setOverlay3] = useState(false)
    const [overlay4, setOverlay4] = useState(false)
    const [active, setActive] = useState(false)
    const [accArrow, setAccArrow] = useState(false)
    const [addButtonStates, setAddButtonStates] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [foodMenuToggle, setFoodMenuTogle] = useState(true)
    const [dummyData, upData] = useState([{ id: 1, name: 'rrrr' }, { id: 2, name: 'jljhhi' }, { id: 3, name: 'rrrr' }])
    const [foods, setFoods] = useState([])
    const [num, setNum] = useState(1)
    const [search, setSearch] = useState(false)
    const [placeHolder, setPlaceHolder] = useState("")


    const food = { id: 1, name: 'idly' }
    const showOverlay = () => {
        setOverlay(true)
    }
    const showOverlay2 = () => {
        setOverlay2(true)
    }
    const showOverlay3 = () => {
        setOverlay3(true)
    }
    const showOverlay4 = () => {
        setOverlay4(true)
    }
    const updateVegButton = () => {
        setActive(!active)
    }
    const arrowMovement = () => {
        setAccArrow(!accArrow)
    }
    const inc = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index] = (newQuantities[index] || 0) + 1;
        setQuantities(newQuantities);
    };

    const dec = (index) => {
        if (quantities[index] > 0) {
            const newQuantities = [...quantities];
            newQuantities[index] = newQuantities[index] - 1;
            setQuantities(newQuantities);
        }
    };
    const controlAddSub = (index, element, item) => {
        const newButtonStates = [...addButtonStates];
        if (newButtonStates[index]) {
            newButtonStates[index] = false;
        } else {
            newButtonStates[index] = true;
        }
        setAddButtonStates(newButtonStates);
        const newQuantities = [...quantities];
        if (!newQuantities[index] || newQuantities[index] === 0) {
            newQuantities[index] = 1;
        }
        setQuantities(newQuantities);
        // console.log('idly,item', element)
        setFoods([...foods, { item: item, element: element }])
        // setFoods([...foods, [{ element: element, Data: [{ item: item }] }]])
        // setHotel(element.name)
        // setImage(element.Image)

        // console.log("sibi", foods)

    }


    const updateFoodToggle = () => {
        setFoodMenuTogle(!foodMenuToggle)
    }
    const navigate = useNavigate()
    const handleNavigate = (id) => {
        navigate(`/cart/${id}`);
    };
    const foodleNavigate = (id) => {
        navigate(`/cart/${fid}`);
    };
    const handleSearch = () => {
        setSearch(!search)
    }
    { /*const handleAdd = (element, item) => {
        console.log('idly,item', element)
        setFoods([...foods, { item: item, element: element }])
        // setFoods([...foods, [{ element: element, Data: [{ item: item }] }]])
        // setHotel(element.name)
        // setImage(element.Image)

        console.log("sibi", foods)

    }*/}






    useEffect(() => {
        // console.log("id:", id);
        axios
            .get(`http://localhost:3000/restaurantData/${id}`)
            .then((response) => {
                // console.log("Response from server:", response.data);
                setArray2([response.data]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    const hotelName = () => {

        let name = "Search in "
        array2.map((element) => {
            name += element.name
            console.log(name, "sibi")
        })
        console.log(name, "sibi")
        console.log("sibi", array2)
        return name
    }

    useEffect(() => {
        const name = hotelName;
        setPlaceHolder(name)
    })




    return (
        <>
            {/* <a onClick={handleNavigate}>cartPage</a> */}
            <header className="cartheader">
                <div ><div className="cartdiv1"><div className="foodcart"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_orange_letter-f.svg/1200px-Eo_circle_orange_letter-f.svg.png" /></div><div className="cartspan"><span>Chennai,Velacherry AGSColony </span></div>
                    <div className="linkdiv"><span><Link className="cartlink" to={{ pathname: `/cart/` }} state={foods}><AddShoppingCartIcon /> CART </Link></span></div></div>
                </div></header>
            {/* <Link to={{ pathname: `/cart/`, state: { foods, array2 } }} >go TO CART PAGE</Link> */}

            {overlay && <div className="overlay" onClick={() => setOverlay(false)}> <div className="box">

                <div className="overlaypadding">
                    <div className="para1">
                        Free Goli Soda
                    </div>
                    <div className="para2">
                        No Code Required
                    </div>
                    <div className="horizontalline">

                    </div>
                    <div className="para3">
                        Free Goli Soda on orders above ₹399
                    </div>
                    <button className="obtn">
                        +More
                    </button>
                </div>
            </div>
            </div>}
            {overlay2 && <div className="overlay" onClick={() => setOverlay2(false)}> <div className="box">
                <div className="overlaypadding">
                    <div className="para5">
                        <div className="para5div">
                            <img className="bullimage" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/rng/md/ads/production/4ff1c56d707713e4d2d9d397f583cd5e" />
                            <span className="sp1">
                                INDUSIND20
                                <span className="sp2">

                                </span>
                                <span className="sp3">

                                </span>
                            </span>

                        </div>
                        <button className="para5btn">Copy</button>
                    </div>
                    <div className="para6">
                        Get 20% discount using selective IndusInd Bank Debit Cards
                    </div>
                    <div className="horizontalline">

                    </div>
                    <div className="para3">
                        Maximum discount up to ₹200 on orders above ₹600
                    </div>
                    <button className="obtn">
                        +More
                    </button>
                </div>
            </div>
            </div>}
            {overlay3 && <div className="overlay" onClick={() => setOverlay3(false)}> <div className="box">

                <div className="overlaypadding">
                    <div className="para5">
                        <div className="para5div">
                            <img className="bullimage" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/rng/md/ads/production/03f54c5ee764ffe8fa39b3334e4ee641" />
                            <span className="sp1">
                                CITIFOODIE
                                <span className="sp2">

                                </span>
                                <span className="sp3">

                                </span>
                            </span>

                        </div>
                        <button className="para5btn">Copy</button>
                    </div>
                    <div className="para6">
                        Get 15% discount using Citi Cards
                    </div>
                    <div className="horizontalline">

                    </div>
                    <div className="para3">
                        Maximum discount up to ₹300 on orders above ₹1200
                    </div>
                    <button className="obtn">
                        +More
                    </button>
                </div>
            </div>
            </div>}
            {overlay4 && <div className="overlay" onClick={() => setOverlay4(false)}> <div className="box">
                <div className="overlaypadding">
                    <div className="para5">
                        <div className="para5div">
                            <img className="bullimage" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/rng/md/ads/production/7d4bed5ef7fa2c039236e2b5048be02f" />
                            <span className="sp1">
                                AMEX150
                                <span className="sp2">

                                </span>
                                <span className="sp3">

                                </span>
                            </span>

                        </div>
                        <button className="para5btn">Copy</button>
                    </div>
                    <div className="para6">
                        Get flat ₹150 discount using American Express Network Cards
                    </div>
                    <div className="horizontalline">

                    </div>
                    <div className="para3">
                        Flat ₹150 discount on orders above ₹600
                    </div>
                    <button className="obtn">
                        +More
                    </button>
                </div>
            </div>
            </div>}
            <div>
                <div>

                    {array2.map((element, index) => {
                        return (


                            <div className="maindiv" key={index}>


                                {!search && <div className="addressdiv">
                                    <a className="anchor1"><span className="">Home</span></a>
                                    <span className="slash">/</span>
                                    <a className="anchor1"><span className="">Chennai</span></a>
                                    <span className="slash">/</span>
                                    <span className="hotelname">{element.name}</span>
                                    {/* <button className="search">
                                        <span className="searchsymbol"> <FontAwesomeIcon icon={faSearch} /></span>
                        </button>*/}
                                </div>}
                                {!search && <button onClick={handleSearch} className="search">
                                    <span className="searchsymbol"> <FontAwesomeIcon icon={faSearch} /></span>
                                </button>}
                                {search && <div className="searchbar">
                                    <div className="searchbar2">
                                        <button className="searchbtn" onClick={handleSearch}>
                                            <svg className="btnsvg">
                                                <path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path>
                                            </svg>
                                        </button>
                                        <div className="inpdiv">
                                            <input placeholder={placeHolder} className="inputsearch"></input>

                                        </div>
                                        <div className="insidesearch">
                                            <span> <span className="searchsymbol"> <FontAwesomeIcon icon={faSearch} /></span></span>
                                        </div>
                                    </div>

                                </div>}
                                <div className="cusinesdiv">
                                    <div className="cusinecontent">
                                        <div className="address">
                                            <div>
                                                <p className="addres1">{element.name}</p>
                                                <p className="addres2">{element.cuisines}</p>
                                            </div>
                                            <div className="addres3"><p className="locname">{element.location}</p>
                                                <p className="km">{element.km} km</p></div>
                                        </div>

                                        <button className="ratingbtn">
                                            <span style={{ color: element.rating > 4 ? "red" : "green" }} className="ratingspan">
                                                <span>
                                                    <FontAwesomeIcon icon={faStar} />
                                                </span>
                                                <span>
                                                    {element.rating}
                                                </span>
                                            </span>
                                            <span className="totalratings">10K+ ratings</span>

                                        </button>
                                    </div>
                                    <hr className="hrline"></hr>
                                    <div className="time">
                                        <span className="whole">
                                            <span className="clock">  <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faClock} />36</span>
                                            <span>MINS</span>
                                        </span>

                                        <span className="rs">
                                            <span className="clock">&#8377;</span>
                                            <span>{element.avgrate}</span>
                                        </span>

                                    </div>
                                </div>
                                <div>
                                    <div className="paddingdiv">
                                        <div className="someeeee">
                                            <div className="offersdiv">
                                                <div className="subofferdiv">
                                                    <button onClick={showOverlay} className="offerbtn">
                                                        <div>
                                                            <div className="flexoffer">
                                                                <div className="image"><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/Store_Assets/Icons/OfferIconCart" />
                                                                    <p className="imagepara">
                                                                        Free Goli Soda
                                                                    </p>
                                                                </div>
                                                                <div className="footerspan">
                                                                    <span className="use">
                                                                        NO CODE REQUIRED
                                                                    </span>
                                                                    <span className="above">
                                                                        | ABOVE ₹399
                                                                    </span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </button>

                                                </div>
                                                <div className="subofferdiv">
                                                    <button onClick={showOverlay2} className="offerbtn">
                                                        <div>
                                                            <div className="flexoffer">
                                                                <div className="image"><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/rng/md/ads/production/5c4848f8c208408b048c18f6be604f14" />
                                                                    <p className="imagepara">
                                                                        20% OFF UPTO ₹200
                                                                    </p>
                                                                </div>
                                                                <div className="footerspan">
                                                                    <span className="use">
                                                                        USE INDUSIND20
                                                                    </span>
                                                                    <span className="above">
                                                                        | ABOVE ₹600
                                                                    </span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </button>

                                                </div>
                                                <div className="subofferdiv">
                                                    <button onClick={showOverlay3} className="offerbtn">
                                                        <div>
                                                            <div className="flexoffer">
                                                                <div className="image"><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/rng/md/ads/production/15fb1cfe885005447dc8375e7970600f" />
                                                                    <p className="imagepara">
                                                                        15% OFF UPTO ₹300
                                                                    </p>
                                                                </div>
                                                                <div className="footerspan">
                                                                    <span className="use">
                                                                        USE CITIFOODIE
                                                                    </span>
                                                                    <span className="above">
                                                                        | ABOVE ₹1200
                                                                    </span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </button>

                                                </div>
                                                <div className="subofferdiv">
                                                    <button onClick={showOverlay4} className="offerbtn">
                                                        <div>
                                                            <div className="flexoffer">
                                                                <div className="image"><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/rng/md/ads/production/59ef5e58052532ad85a185bf516eccce" />
                                                                    <p className="imagepara">
                                                                        FLAT ₹150 OFF
                                                                    </p>
                                                                </div>
                                                                <div className="footerspan">
                                                                    <span className="use">
                                                                        USE AMEX150
                                                                    </span>
                                                                    <span className="above">
                                                                        | ABOVE ₹600
                                                                    </span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="vegonly">
                                        <div className="togglebtn">
                                            <div className="vegpara">Veg Only</div>
                                            <button onClick={updateVegButton} className="vegbtn">
                                                <span className={`vegspan1 ${active ? 'vegspan1style' : ''}`}>
                                                    <span className={`vegspan2 ${active ? 'vegSpan2Style' : ''}`}>
                                                        <span className={`vegspan3 ${active ? 'vegspan3style' : ''}`}>
                                                            <span className="vegspan4"></span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="borderlinelast"></div>
                                </div>
                                <div className="mainfoodcontainer">
                                    <button onClick={arrowMovement} className="foodconbtn">
                                        <h3 className="rec">Recommended (10)</h3>
                                        <span onClick={updateFoodToggle} className="accordiarrow">{accArrow ? <FiChevronDown /> : <FiChevronUp />}</span>
                                    </button>
                                    <div>
                                        {foodMenuToggle && <div >
                                            {element.items.map((item, index) => (
                                                <>
                                                    <div className="foodmenu">
                                                        <div className="subfoodmenu">
                                                            <div className="foodib" key={index}>
                                                                <div>
                                                                    <span className="nvorv">
                                                                        <FontAwesomeIcon icon={faUtensils} />
                                                                    </span>
                                                                </div>
                                                                <div className="fdsname">
                                                                    <h3 className="fdsh3">{item.foodname}</h3>
                                                                </div>
                                                                <div className="fdprise">
                                                                    <span className="prisespan">
                                                                        <span>
                                                                            &#8377;
                                                                            {item.price}
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div className="serves">Serves 1</div>

                                                            </div>
                                                            <div className="fdimgdiv">
                                                                <div>
                                                                    <button className="fdimgbtn">
                                                                        <img className="imgafter" src={item.imageurl} />
                                                                    </button>
                                                                </div>
                                                                <div className="addtocart">
                                                                    <div className="add2">
                                                                        { /*<button onClick={() => { handleAdd(element, item) }}>add</button>*/}
                                                                        {(quantities[index] < 1 || !addButtonStates[index]) && (
                                                                            <div onClick={() => controlAddSub(index, element, item)} className="inlineadd">
                                                                                ADD
                                                                            </div>
                                                                        )}
                                                                        {addButtonStates[index] && quantities[index] >= 1 && (
                                                                            <div>
                                                                                <div onClick={() => inc(index)} className="inc">
                                                                                    +
                                                                                </div>
                                                                                <div onClick={() => dec(index)} className="dec">
                                                                                    -
                                                                                </div>
                                                                                <div className="addsub">{quantities[index]}</div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="foodmargin"></div>
                                                </>

                                            ))}

                                            <div></div>


                                        </div>}

                                    </div>
                                </div>
                                <div className="mainborder"></div>

                            </div>)


                    })


                    }
                </div>
            </div>


        </>

    );

}
export default HotelMenuComponent;