import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./cart.css"
import { FaQuoteLeft } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { MdAccountBalanceWallet } from 'react-icons/md'
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';
import { BiCheckboxSquare } from 'react-icons/bi'






const Cart = (props) => {
    // console.log("checkcart", Props)
    if (props.myArray && props.myArray.length > 0) {
        // myArray is defined and contains elements
        // You can iterate over the array or perform other operations
        props.myArray.forEach(item => {
            // Do something with each item in myArray
            // console.log(item);
        });
    } else {
        // myArray is either undefined, null, or empty
        // Handle the case where myArray is not populated
        // console.log("myArray is empty or not defined");
    }


    const [myArray, setMyArray] = useState([]);
    const [tick, setTick] = useState(false);
    const [form, setForm] = useState(false);
    const { id, fid } = useParams();
    const [num, setNum] = useState(1)
    const location = useLocation();
    const [quantities, setQuantities] = useState([1]);
    // const [selectedIndex, setSelectedIndex] = useState(null);

    const foods = location.state;

    const [cartList, setCartList] = useState(foods)
    // const [dummyArray, setDummyArray] = useState(foo)

    // console.log("yyyyy", cartList)
    // console.log("food", foods)

    //const props.myArray = useSelector(selectProps.myArray);

    //  const [showContainer, setShowContainer] = useState(true);
    // const handleContainer = () => {
    //    setShowContainer(false);
    // }
    useEffect(() => {

        axios
            .get(`http://localhost:3000/restaurantData/${id}`)
            .then((response) => {
                // console.log("Response from server:", response.data);

                // Assuming the array you want to set is nested inside response.data.items
                const nestedArray = response.data;

                setMyArray([nestedArray]); // Use spread operator to create a new array

                // console.log("sibi", myArray);
            })
            .catch((error) => {
                // console.error("Error:", error);
            });


    }, [])






    const formSubmission = () => {
        setForm(true)
    }
    {/*const addBtn = () => {
        const updatedArray = cartList.map((element, index) => {
            const addElement = element.item.increment;
            return {
                ...element,
                item: {
                    ...element.item,
                    price: element.item.price + addElement,
                },
            };
        });

        setCartList(updatedArray);
        setNum(num + 1);
    };*/}
    const addBtn = (selectedIndex) => {
        const updatedArray = cartList.map((element, index) => {
            if (index === selectedIndex) {
                const addElement = element.item.increment;
                return {
                    ...element,
                    item: {
                        ...element.item,
                        price: element.item.price + addElement,
                    },
                };
            }
            return element;
        });

        setCartList(updatedArray);
        // setNum(num + 1);
        // const newQuantities = [...quantities];
        // newQuantities[selectedIndex] = (newQuantities[selectedIndex] || 0) + 1;
        // setQuantities(newQuantities);
        const updatedQuantities = [...quantities];
        updatedQuantities[selectedIndex] = (updatedQuantities[selectedIndex] || 0) + 1;
        setQuantities(updatedQuantities);
    };
    const minusBtn = (selectedIndex) => {
        const updatedArray = cartList.map((element, index) => {
            if (index === selectedIndex) {
                const addElement = element.item.increment;
                return {
                    ...element,
                    item: {
                        ...element.item,
                        price: element.item.price - addElement,
                    },
                };
            }
            return element;
        });

        setCartList(updatedArray);

        //  setNum(num - 1);
        //  const newQuantities = [...quantities];
        //  newQuantities[selectedIndex] = newQuantities[selectedIndex] - 1;
        // setQuantities(newQuantities);
        const updatedQuantities = [...quantities];
        updatedQuantities[selectedIndex] = Math.max((updatedQuantities[selectedIndex] || 0) - 1, 0);
        setQuantities(updatedQuantities);
    };




    const myBillingArr = () => {
        return cartList.map((element, index) => {
            return (
                <>
                    <div key={index} className="faflex">
                        <BiCheckboxSquare className="faicon" />
                        <div className="fname">{element.item.foodname}</div>
                    </div>
                    <div className="btns">
                        <div className="align">
                            <div onClick={() => minusBtn(index)} className="minus">-</div>
                            <div className="num">{quantities}</div>
                            <div onClick={() => addBtn(index)} className="plus">+</div>
                        </div>
                    </div>
                    <div className="fprize">{element.item.price}</div>
                </>
            )
        })
    }


    {/* const myBillingArr = () => {
        return cartList.map((element, index) => {
            return (
                <>
                    <div key={index} className="faflex">
                        <BiCheckboxSquare className="faicon" />
                        <div className="fname">{element.item.foodname}</div>
                    </div>
                    <div className="btns">
                        <div onClick={() => setNewQuantities(index)} className="align">
                            <div onClick={() => minusBtn(index)} className="minus">-</div>
                            <div className="num">{quantities[index]}</div>
                            <div onClick={() => addBtn(index)} className="plus">+</div>
                        </div>
                    </div>
                    <div className="fprize">{element.item.price}</div>
                </>
            )
        })
    }*/}

    const delevirydiv = () => {
        const elements = []
        for (let i = 0; i < cartList.length; i++) {
            if (i === 0) {
                elements.push(
                    <>

                        <div className="itotal maindelivery">
                            <div className="subitotal">
                                <div>Delivery Fee | {cartList[i].element.km} kms
                                    <div className="oi"><span className="infoicon">
                                        <div className="overlaybox">
                                            <span class="message">Delivery fee backup for this order</span>
                                            <div className="msgcontainer">  <div className="msg2 msgbase">Base fee</div>
                                                <div className="msg2 msgrs">34.00</div>
                                            </div>
                                            <div className="msgcontainer msgcontainer2 ">  <div className="msg2 msgbase">Surge fee</div>
                                                <div className="msg2 msgrs">8.00</div>
                                            </div>
                                            <div className="surge">surge stress fee aplied due to heavy demand</div>
                                        </div>
                                        <FaInfoCircle />
                                    </span></div>

                                </div>

                            </div>
                            <div className="rsright"><span>{cartList[i].element.deliveryfee}</span></div>
                        </div>
                    </>)
            }
        }

        return <div>{elements}</div>;

    }

    var Total = 0;

    cartList && cartList.forEach((element) => {

        Total += Number(element.item.price)


    })
    // console.log(Total)

    var platformfee = 2
    var GST = 25
    const grandTotal = () => {
        let GrandTotal = platformfee + GST + Total
        return GrandTotal
    }

    const handleClick = () => {
        setTick(true)
    }

    const itemTotal = () => {
        let total = 0;
        cartList && cartList.forEach((element) => {

            total += Number(element.item.price);
            // console.log(typeof (total), "total")

        });
        // console.log(total)
        return total;
    };



    const calculation = () => {
        const total = itemTotal();
        return (
            <>
                <div className="subcalculation">
                    <div className="bdetails">Bill Details</div>
                    <div className="itotal">
                        <div className="subitotal">
                            <span className="sptotal">Item Total</span>
                        </div>
                        <div className="rsright">
                            <span>{total}</span>
                        </div>
                    </div>
                    {delevirydiv()}
                    <div className="bborder"></div>
                    <div className=" itotal">
                        <div className="subitotal">
                            <div>Platform fee
                                <div className="oi">
                                    <span className="infoicon">
                                        <div className="overlaybox2">
                                            <span class="message">Platform Fee</span>
                                            <div className="msg2 msgbase">This fee help us operate and improve our </div>
                                            <div className="msg2 msgbase">platform,delivering
                                                a seamless app experience</div>
                                        </div>
                                        <FaInfoCircle />
                                    </span></div></div>
                        </div>
                        <div className="rsright">2</div>
                    </div>
                    <div className=" itotal gstmt">
                        <div className="subitotal">
                            <div> GST and Restaurant Charges
                                <div className="oi"><span className="infoicon">
                                    <div className="overlaybox">
                                        <span class="message">GST and restaurant charges</span>
                                        <div className="msgcontainer">  <div className="msg2 msgbase">Restaurant GST</div>
                                            <div className="msg2 msgrs">25</div>
                                        </div>
                                        <div className="surge">Swiggy plays no roles in the Taxes and charges leveled by the govt. and restaurant
                                        </div>
                                    </div>
                                    <FaInfoCircle />
                                </span></div></div>
                        </div>
                        <div className="rsright">25</div>
                    </div>




                </div>

            </>
        )
    }
    const imgFunction = () => {
        const elements = [];

        for (let i = 0; i < cartList.length; i++) {
            if (i === 0) {
                elements.push(

                    <span><img className="btnimg" src={cartList[i].element.image} /></span>


                );
            }

        }

        return <div>{elements}</div>;

    };
    const hotelNameFunction = () => {
        const elements = [];

        for (let i = 0; i < cartList.length; i++) {
            if (i === 0) {
                elements.push(

                    <div> {cartList[i].element.name}</div>


                );
            }

        }

        return <div>{elements}</div>;

    };




    return (
        <>
            {/*  <div><button onClick={handleContainer}>showempty</button></div>*/}
            <div className="hole">

                {cartList.length === 0 || num < 1 ? (<div className="cart-container">
                    <div className="back-img"></div>
                    <div className="empty">Your cart is empty</div>
                    <div className="home">You can go to home page to view more restaurants</div>
                    <div className="pointer">See restaurants near you</div>
                </div>) : null}

                {/* {console.log("cartpageeeee", data)} */}
                <div className="emptycart">
                    <div className="left">

                        <div>
                            <div>
                                <div className="leftdiv">
                                    <div className="head"><div>Account</div></div>
                                    <div className="placingorder">
                                        <div className="ordercontent">To place your order now, log in to your existing account or sign up.</div>
                                        <img className="borito" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r" />
                                        <div className="sign-in-btns">
                                            <button className="signin-btn1"> <div style={{ fontSize: "13px" }}>Have an account?</div>
                                                <div style={{ fontSize: "14px", fontWeight: "600" }}>LOG IN</div></button>
                                            <button onClick={formSubmission} className="signin-btn2"><div style={{ fontSize: "13px" }}>New to Frisp?</div>
                                                <div style={{ fontSize: "14px", fontWeight: "600" }}>SIGN UP</div></button>
                                        </div>
                                        {form && <div className="form">
                                            <div className="signuplogin">
                                                <p className="formsignup">Sign up or</p>
                                                <a className="anchor"> log in to your account</a>

                                            </div>
                                            <form>
                                                <div>
                                                    <div className="inputdiv">
                                                        <input type="number" className="phonenum"></input>
                                                        <p className="enterphonenumber">Phone number</p>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>}
                                    </div>
                                    <div className="verticaldottedline"></div>
                                    <div className="iconuser"><span className="usercheckout"><FaUser /></span></div>
                                </div>
                                <div className="leftdiv">
                                    <div className=" head daddress ">Delivery address</div>
                                    <div className="verticaldottedline"></div>
                                    <div className="iconuser iconuser2"><span className="usercheckout usercheckout2">< MdLocationOn size={20} /></span></div>
                                </div>
                                <div className="leftdiv">
                                    <div className=" head daddress ">Payment</div>
                                    <div className="iconuser iconuser2"><span className="usercheckout usercheckout2">< MdAccountBalanceWallet size={20} /></span></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* {myArray.length === 0 || num > 1 ? (<div className="ttlheight"><div className="right"> */}

                    {cartList.length === 0 || num < 1 ? (<div className="ttlheight"><div className="right">

                        <div className="cart">Cart Empty</div>
                        <img className="rt-img" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_480/Cart_empty_-_menu_2x_ejjkf2" />
                        <div className="rt-footer">Good food is always cooking! Go ahead, order some yummy items from the menu.</div>
                    </div></div>) :
                        (<div className="cart">
                            <div className="subcart" >
                                <button className="btn-sa">
                                    <div>{imgFunction()}</div>

                                    <span className="imghd">
                                        <div >{hotelNameFunction()}</div>
                                        <div>Guindy</div>
                                    </span>
                                </button>
                                <div className="mainbilling">
                                    <div className="subbilling">
                                        <div className="sub1">
                                            <div>
                                                <div className="billingdiv1">
                                                    <div className="billingdiv2">
                                                        {myBillingArr()}
                                                    </div>


                                                </div>
                                                <div className="feedback">
                                                    <input className="inp" placeholder="Any suggestions? we will pass it on"></input>
                                                    <FaQuoteLeft className="faquote" />
                                                </div>
                                                <div className="unwell">
                                                    <div className="subunwell">
                                                        <div className="checkbox">
                                                            <label className="label" onClick={handleClick}>
                                                                <input type="checkbox" className="inp2"></input>
                                                                {tick && <svg className="svg" viewBox="0 0 24 24">
                                                                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                                                </svg>}
                                                            </label>
                                                        </div>
                                                        <div className="description">
                                                            <div className="headerdel">Opt in for No-contact Delivery</div>
                                                            <div className="contentdel">Unwell, or avoiding contact? Please select no-contact delivery.
                                                                Partner will safely place the order outside your door (not for COD)</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {calculation()}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="grandtotal">
                                    <div>To Pay</div>
                                    <div className="finaltotal">{grandTotal()}</div>
                                </div>


                                <div className="billingft">
                                    <div>
                                        <div className="ftcontainer">
                                            <div className="reviewhd">
                                                <p>Review your order and address details to avoid cancellations</p>
                                            </div>
                                            <div className="midpara">
                                                <p>
                                                    <span style={{ color: "red" }}>Note:</span>
                                                    If you cancel within 60 seconds of placing your order, a 100% refund will be issued.
                                                    No refund for cancellations made after 60 seconds.<br />
                                                    <span style={{ color: "grey" }}>
                                                        Avoid cancellation as it leads to food wastage.
                                                    </span>

                                                </p>


                                            </div>
                                            <div className="policy">
                                                <a className="orange"

                                                    href="https://www.swiggy.com/refund-policy"
                                                >
                                                    Read cancellation policy</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>)}

                </div>

            </div>

            <div>

            </div>



        </>
    )
}
export default Cart;