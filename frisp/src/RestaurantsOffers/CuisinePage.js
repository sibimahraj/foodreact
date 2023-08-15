import React, { useEffect, useState } from "react";
import "./OffersDesign.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const CuisinePage = () => {
  // const [cOffer, setcOffer] = useState([]);
  const [filData, setFilData] = useState([]);
  const [reqCompleted, updreqCompleted] = useState(false);
  const { cuisine } = useParams();
  const fetchCuisine = async () => {
    await axios.get("http://localhost:3000/restaurantData").then((res) => {
      // setcOffer(res.data);
      finalData(res.data);
    });
    updreqCompleted(true);
  };
  const finalData = (cOfferData) => {
    const dd = cOfferData.filter((ee) => {
      return ee.cuisines
        .split(",")
        .map((item) => item.trim())
        .includes(cuisine);
    });
    setFilData(dd);
  };
  useEffect(() => {
    fetchCuisine();
  }, []);
  const cardItem = () => {
    // const showDataCount=Temparr.length==0?noOfImgToShow:filterDataShow
    return (
      <section id="" className="offer-section ">
        <div className="offer-container">
          <div className="offer-row">
            {/* {(Temparr.length==0?offer:Temparr).slice(0, noOfImgToShow).map((ele, ind) => { */}
            {filData.map((ele, ind) => {
              return (
                <>
                  {/* <div key={ind} className="offer-column" onClick={(e)=>singleResta(ele.id)}> */}
                  <div key={ind} className="offer-column">
                    <div className="offer-img">
                      <img src={ele.image} alt={ele.name} />
                      <div className="offer-heading">
                        <h4 className="offer-head">{ele.offerRange}</h4>
                      </div>
                    </div>
                    <div className="offer-content">
                      <h3>{ele.name}</h3>
                      <div className="star-icon">
                        {/* <span>
                          <FontAwesomeIcon icon={faStar} />
                        </span> */}
                        <h5>{ele.rating}</h5>
                      </div>

                      <div className="offer-desc">
                        <h4>{ele.cuisines}</h4>
                        <h3>{ele.location}</h3>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <h1>cuisinee page</h1>
      {reqCompleted && (
        <>{filData.length == 0 ? <h1>NO data found</h1> : cardItem()}</>
      )}
      {/* {cardItem()} */}
    </>
  );
};
export default CuisinePage;
