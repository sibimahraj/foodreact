import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { BiCheckboxSquare } from 'react-icons/bi'
import HotelMenuComponent from "../hotelmenu";
import Cart from "./cartPage";
import "./cart.css"
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const Samplepage = () => {



    const [num, setNum] = useState(1)
    const [myArray, setMyArray] = useState([]);




    useEffect(() => {
        axios
            .get('http://localhost:3000/restaurantData')
            .then((response) => {
                // console.log("Response from server:", response.data);
                const nestedArray = response.data;
                setMyArray([...nestedArray]);
                // console.log(myArray)

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);





    const addBtn = () => {
        const updatedArray = myArray.map((element) => {
            const updatedItems = element.items.map((item) => {
                const addElement = item.increment;
                return {
                    ...item,
                    price: item.price + addElement,
                };
            });

            return {
                ...element,
                item: updatedItems,
            };
        });

        setMyArray(updatedArray);
        setNum(num + 1);
    };


    const minusBtn = () => {
        const updatedArray = myArray.map((element) => {
            const updatedItems = element.items.map((item) => {
                const addElement = item.increment;
                return {
                    ...item,
                    price: item.price - addElement,
                };
            });

            return {
                ...element,
                item: updatedItems,
            };
        });

        setMyArray(updatedArray);
        setNum(num - 1);
    };




    const myBillingArr = () => {
        return myArray.map((element, index) => {
            return (
                <div key={index}>
                    {element.items.map((item, index) => (
                        <>
                            <div key={index} className="faflex">
                                <BiCheckboxSquare className="faicon" />
                                <div className="fname">{item.foodname}</div>
                            </div>
                            <div className="btns">
                                <div className="align">
                                    <div onClick={minusBtn} className="minus">-</div>
                                    <div className="num">{num}</div>
                                    <div onClick={addBtn} className="plus">+</div>
                                </div>
                            </div>
                            <div className="fprize">{item.price}</div>
                        </>
                    ))}
                </div>
            );
        });
    };



    return (
        <>


            <Cart myArray={myArray} />
            <HotelMenuComponent />
        </>
    )
}
export default Samplepage;