import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./OffersDesign.css";
import "./offerpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
import { faStar, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Offers = () => {
  const navigate = useNavigate();
  const [offer, setOffer] = useState([]);
  const [noOfImgToShow, setNoOfImgToShow] = useState(12);
  const [cuisines, setCuisines] = useState([]);
  const [noOfCuisineToShow, setNoOfCuisineToShow] = useState(11);
  const [filterDataShow, setFilterDataShow] = useState(12);
  const [search, setSearch] = useState("");
  const [check, setCheck] = useState(false)
  const [dd, setDd] = useState([]);


  const fetchData = async () => {
    await axios
      .get("http://localhost:3000/restaurantData")
      .then((response) => setOffer(response.data))
      .catch((err) => console.log(err));
    await axios
      .get("http://localhost:3000/cuisinesNearMe")
      .then((res) => setCuisines(res.data[0].cName))
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImgToShow = () => {
    setNoOfImgToShow((prevState) => prevState + 12);
  };

  const handleFilterShow = () => {
    setFilterDataShow((prevState) => prevState + 12);
  };
  const handleShowMore = () => {
    setNoOfCuisineToShow((prevState) => prevState + 12);
  };


  const handleCuisines = (cuisine) => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    updPreDefinedCuisine(cuisine)

    // navigate(`/filtered/${cuisine}`);
  };

  const singleResta = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const [Temparr, setTemparry] = useState([]);

  const [selectoffers, setselectofers] = useState(true);
  const [selectfastdelivery, setselectfastdelivery] = useState(false);
  const [selectrating, setselectratin] = useState(false);
  const [selectpureveg, setselectpureveg] = useState(null);
  const [selectmediumrate, setselectmediumrate] = useState(false);
  const [selectlowprice, setselectlowprice] = useState(false);

  const [sorthoverratio, setsorthoverratio] = useState("sortbyoption1");
  const [fastdelveryratio, setfastdelveryratio] = useState("");
  const [swiggyarived, setswiggyarived] = useState("");
  const [ratinghoverdata, setratinghoverdata] = useState("");
  const [vegornonveghoverdata, setvegornonveghoverdata] = useState("");
  const [hoveroffer, sethoveroffer] = useState("");
  const [hoverratefortwo, sethoverratefortwo] = useState("");
  const [hovercuisines, sethovercuisines] = useState("");

  const [preDefinedCuisine, updPreDefinedCuisine] = useState("");

  const cuisinesselect = (event) => {
    sethovercuisines(event.target.value);
  };

  const sortbyoncange = (event) => {
    setsorthoverratio(event.target.value);
  };

  const deliverytimechange = (event) => {
    setfastdelveryratio(event.target.value);
  };

  const swiggyarivedchange = (event) => {
    setswiggyarived(event.target.value);
  };

  const ratinghoverchange = (event) => {
    setratinghoverdata(event.target.value);
  };

  const vegornonveghoverchange = (event) => {
    setvegornonveghoverdata(event.target.value);
  };

  const hoverofferchange = (event) => {
    sethoveroffer(event.target.value);
  };

  const ratefortwochange = (event) => {
    sethoverratefortwo(event.target.value);
  };

  const applayfilter = () => {
    let updatedlist = offer.map((ele) => ele);

    if (selectoffers) {
      if (check == true) {
        updPreDefinedCuisine('')


      }
      // setCheck(false)
      updatedlist = updatedlist.sort(
        (a, b) => parseFloat(b.offerRange) - parseFloat(a.offerRange)
      );
    }

    if (selectfastdelivery) {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.sort(
        (a, b) => parseFloat(a.dtime) - parseFloat(b.dtime)
      );

    }

    if (selectrating) {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
    }

    if (selectpureveg) {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.vegORnonveg === "pureveg";
      });
    }

    if (selectmediumrate) {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.fortwopepole >= 300;
      });
    }

    if (selectlowprice) {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.fortwopepole < 300;
      });
    }

    if (sorthoverratio === "sortbyoption2") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.sort(
        (a, b) => parseFloat(a.dtime) - parseFloat(b.dtime)
      );
    }

    if (sorthoverratio === "sortbyoption3") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
    }

    if (sorthoverratio === "sortbyoption4") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.sort(
        (a, b) => parseFloat(a.fortwopepole) - parseFloat(b.fortwopepole)
      );
    }

    if (sorthoverratio === "sortbyoption5") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.sort(
        (a, b) => parseFloat(b.fortwopepole) - parseFloat(a.fortwopepole)
      );
    }

    if (fastdelveryratio === "timeoption") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.sort(
        (a, b) => parseFloat(a.dtime) - parseFloat(b.dtime)
      );
    }

    if (swiggyarived === "newswiggy") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.location === "Adayar";
      });
    }
    if (swiggyarived === "exswiggy") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.location === "Avadi";
      });
    }

    if (ratinghoverdata === "rating1") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.rating === 4.5;
      });
    }

    if (ratinghoverdata === "rating2") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.rating === 4.1;
      });
    }

    if (ratinghoverdata === "rating3") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.rating === 3.7;
      });
    }

    if (vegornonveghoverdata === "pureveg1") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.vegORnonveg === "pureveg";
      });
    }
    if (vegornonveghoverdata === "nonveg2") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.vegORnonveg === "Nonveg";
      });
    }

    if (hoveroffer === "hoveroffer1") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.sort(
        (a, b) => parseFloat(b.offerRange) - parseFloat(a.offerRange)
      );
    }

    if (hoverratefortwo === "rate1") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.fortwopepole >= 300;
      });
    }
    if (hoverratefortwo === "rate2") {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.fortwopepole < 300;
      });
    }

    if (hovercuisines) {
      updPreDefinedCuisine('')

      updatedlist = updatedlist.filter((ele) => {
        return ele.cuisines
          .split(",")
          .map((item) => item.trim())
          .includes(hovercuisines);
      });
    }





    if (preDefinedCuisine) {
      updatedlist = updatedlist.filter((ele) => {
        return ele.cuisines
          .split(",")
          .map((item) => item.trim())
          .includes(preDefinedCuisine);

      }

      );


    }


    // setCheck(updatedlist)
    // console.log("check")
    // console.log(updatedlist)
    // if(check.length==0)
    // {
    //   // setCheck(updatedlist)
    //   // setTemparry(updatedlist);
    //   console.log("if uopdat",updatedlist)
    // }
    if (preDefinedCuisine !== '' && updatedlist.length == 0) {

      setCheck(true)
      setselectofers(false)
      // console.log("if part")      
    }
    else {
      setCheck(false)
      // setselectofers(true)
      // console.log("else part")
    }

    setTemparry(updatedlist);
    setfilter(false);

  }



  useEffect(() => {
    applayfilter();
    // console.log("fffff dddd useeeffect",selectfastdelivery)
  }, [
    offer,
    selectoffers,
    selectfastdelivery,
    selectrating,
    selectpureveg,
    selectmediumrate,
    selectlowprice,
    sorthoverratio,
    preDefinedCuisine
  ]);

  const searchRestaurant = () => {
    const filtersearch = offer.filter((item) => {
      return search.toLowerCase() == ""
        ? item
        : item.name.toLowerCase().includes(search) ||
        item.location.toLowerCase().includes(search) ||
        item.cuisines
          .split(",")
          .map((ite) => ite.trim())
          .includes(search);
    });
    return filtersearch;
  };

  const cardItem = () => {
    const showDataCount = Temparr.length == 0 ? noOfImgToShow : filterDataShow;

    return (
      <section id="" className="offer-section">
        <div className="offer-container">
          {/* {check?'NO DATA FOUND':<div className="offer-row"> */}
          {check ? <div className="nofound"><img src='https://i.pinimg.com/originals/77/17/fb/7717fbf1f4ea5676ab6c118cb2552a8f.png' /></div> : <div className="offer-row">

            {/* {(Temparr.length==0?offer:Temparr).slice(0, noOfImgToShow).map((ele, ind) => { */}
            {(Temparr.length == 0 ? offer : Temparr)
              .slice(0, showDataCount)
              .map((ele, ind) => {
                {
                  /* {(search==''?offer:(search!=''?searchRestaurant():Temparr.length==0?offer:Temparr)).slice(0, noOfImgToShow).map((ele, ind) => { */
                }

                return (
                  <>
                    <div
                      key={ind}
                      className="offer-column"
                      onClick={(e) => singleResta(ele.id)}
                    >
                      <div className="offer-img">
                        <img src={ele.image} alt={ele.name} />
                        <div className="offer-heading">
                          <h4 className="offer-head">{ele.offerRange}</h4>
                        </div>
                      </div>
                      <div className="offer-content">
                        <h3>{ele.name}</h3>
                        <div className="star-icon">
                          <span>
                            <FontAwesomeIcon icon={faStar} />
                          </span>
                          <h5>{ele.rating}</h5>
                        </div>

                        <div className="offer-desc">
                          <h4 title={ele.cuisines}>{ele.cuisines}</h4>
                          <h3>{ele.location}</h3>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>}
          {filterDataShow < Temparr.length ? (
            <div className="showDiv">
              <button onClick={handleFilterShow} className="showbtn">
                Show more
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </button>
            </div>
          ) : (
            ""
          )}

          {noOfImgToShow < offer.length && Temparr.length == 0 && (
            !check && <div className="showDiv">
              <button onClick={handleImgToShow} className="showbtn">
                Show more{" "}
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
    );
  };

  const cuisineItems = () => {
    return (
      <section className="c-section">
        <div className="c-container">
          <h3>Cuisines near me</h3>
          {/* {check?<h1>{'no dat found'}</h1>:''} */}
          <div className="c-row">
            {cuisines.slice(0, noOfCuisineToShow).map((ele, ind) => {
              return (
                <>
                  <div className="c-column">
                    <button onClick={() => handleCuisines(ele)}>
                      {/* <button onClick={()=>updPreDefinedCuisine(ele)} > */}
                      {ele}
                    </button>
                  </div>
                </>
              );
            })}
            {noOfCuisineToShow < cuisines.length && (
              <div className="c-column">
                <button onClick={handleShowMore}>
                  show more
                  <span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  // setOffer(offer.sort((a,b)=>(parseFloat(a.dtime) - parseFloat(b.dtime))))

  //*******************Header and offer btns***************************

  const OffHead = () => {
    let [fixednavbar, setfixednavbar] = useState(false);
    const navigate = useNavigate();
    const handleSearch = () => {
      navigate("/search");
    };
    let changeNavbarHed = () => {
      if (window.scrollY >= 120) {
        setfixednavbar(true);
      } else {
        setfixednavbar(false);
      }
    };
    window.addEventListener("scroll", changeNavbarHed);

    return (
      <>
        <div className={fixednavbar ? "offnavbarblock" : "offernav"}>
          <div className="headitem1">
            <Link to='/'>
              <div>
                <img
                  // src="https://seeklogo.com/images/S/swiggy-logo-8EF8260FA4-seeklogo.com.png"
                  // src="https://logos.flamingtext.com/Word-Logos/food-design-china-name.png"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_orange_letter-f.svg/1200px-Eo_circle_orange_letter-f.svg.png"
                  // style={{ width: 28 }}

                  style={{ width: '63px', height: '52px' }}
                />
              </div>
            </Link>

            {/* <div className="swiggyletter">Swiggy</div> */}
            <div className="swiggyletter">Food</div>

          </div>

          <div className="headitem2">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRRcotSZQcyC3SCKM0GZ2L4eN6WEdxbwTzWKl_stnzVG3RkAET3"
              style={{ width: 50, height: 30 }}
            />

            <div className="smallletter">Setup your precise location</div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUOiCt4AFQ17wQCtOaJYFTJx6ko9Aq_UYZw&usqp=CAUhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUOiCt4AFQ17wQCtOaJYFTJx6ko9Aq_UYZw&usqp=CAU"
              style={{ width: 20, height: 20, marginTop: 7 }}
            />
          </div>

          <div className="srchbtndiv">
            <button className="searchbtnoffer" onClick={handleSearch}>
              <div className="serchbrletter">
                Search for restaurant and food
              </div>
              <div className="searchicon">
                {/* <img
                  src="https://img.uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png"
                  style={{ width: 20 }}
                /> */}
                <span><SearchRoundedIcon />  </span>
              </div>
            </button>
          </div>

          <div className="profilehead">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYmZY4cFX8Bbiyiaxx3_7w35A7wg1L9JclSFYtLik&s"
              style={{ width: 50 }}
            />
          </div>
        </div>
      </>
    );
  };

  const Offerbar = () => {
    let [fixednavbar, setfixednavbar] = useState(false);
    let changeNavbarHed = () => {
      if (window.scrollY >= 120) {
        setfixednavbar(true);
      } else {
        setfixednavbar(false);
      }
    };
    window.addEventListener("scroll", changeNavbarHed);

    return (
      <>
        <div className="offerpage">
          <div><Link to='/' style={{ textDecoration: "none", color: '#000000' }}>Home</Link>/offers{preDefinedCuisine !== '' && `/${preDefinedCuisine}`}</div>
          <div className="offerline">{preDefinedCuisine !== '' && `Best ${preDefinedCuisine}`} Restaurants {preDefinedCuisine == '' && 'with great offers'} near me</div>
          <br />

          <div className={fixednavbar ? "secondnavbarfix" : "secondnavbar"}>
            <div>
              <button className="filterbtn" onClick={() => setfilter(true)}>
                Filter
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQltz752gXYzKrIodHbI_9B0f3W_25ICZDbvg&usqp=CAU"
                  style={{ width: 18, height: 13, marginLeft: 7 }}
                />
              </button>
            </div>

            <div>
              <button className="sortbybtn" onClick={() => falsedrop(true)}>
                Sort By
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6jOHG4xs2adnbPhWvXxVZZPF5eN0yMISMJ53hO6Thgg&s"
                  style={{ width: 18, height: 13, marginLeft: 7 }}
                />
              </button>
              {truedrop && Sortbydrop()}
            </div>

            <div>
              <button
                className={selectoffers === true ? "ONbtn" : "filtersbtns"}
                onClick={
                  selectoffers === true
                    ? () => setselectofers(false)
                    : () => setselectofers(true)
                }
              >
                Offers
              </button>
            </div>

            <div>
              <button
                className={
                  selectfastdelivery === true ? "ONbtn" : "filtersbtns"
                }
                onClick={
                  selectfastdelivery === true
                    ? () => setselectfastdelivery(false)
                    : () => setselectfastdelivery(true)
                }
              >
                Fast Delivery
              </button>
            </div>

            <div>
              <button
                className={selectrating === true ? "ONbtn" : "filtersbtns"}
                onClick={
                  selectrating === true
                    ? () => setselectratin(false)
                    : () => setselectratin(true)
                }
              >
                Ratings 4.0+
              </button>
            </div>

            <div>
              <button
                className={selectpureveg === true ? "ONbtn" : "filtersbtns"}
                onClick={
                  selectpureveg === true
                    ? () => setselectpureveg(false)
                    : () => setselectpureveg(true)
                }
              >
                Pure Veg
              </button>
            </div>

            <div>
              <button
                className={
                  selectlowprice === true
                    ? "Hidebun"
                    : selectmediumrate === true
                      ? "ONbtn"
                      : "filtersbtns"
                }
                onClick={
                  selectmediumrate === true
                    ? () => setselectmediumrate(false)
                    : () => setselectmediumrate(true)
                }
              >
                Rs.300 - Rs.600
              </button>
            </div>

            <div>
              <button
                className={
                  selectmediumrate === true
                    ? "Hidebun"
                    : selectlowprice === true
                      ? "ONbtn"
                      : "filtersbtns"
                }
                onClick={
                  selectlowprice === true
                    ? () => setselectlowprice(false)
                    : () => setselectlowprice(true)
                }
              >
                Less than Rs.300
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const [filterform, setfilter] = useState(false);

  const Filterbox = () => {
    return (
      <>
        <div className="hoverpage">
          <div className="hoverheader">
            <div className="filterletter">
              {" "}
              Filter
              <button className="hoverclose" onClick={Hoverclosebtn}>
                close
              </button>
            </div>
          </div>

          <div className="hover1">
            <div className="hoverbody">
              <div className="hoverlistpage">
                <br />
                <div className="hoverlist" onClick={() => prelistcond(1)}>
                  Sort
                </div>
                <br />
                <div className="hoverlist" onClick={() => prelistcond(2)}>
                  Delivery time
                </div>
                <br />
                <div className="hoverlist" onClick={() => prelistcond(3)}>
                  Cuisines
                </div>
                <br />
                <div className="hoverlist" onClick={() => prelistcond(4)}>
                  Explore
                </div>
                <br />
                <div className="hoverlist" onClick={() => prelistcond(5)}>
                  Rating
                </div>
                <br />
                <div className="hoverlist" onClick={() => prelistcond(6)}>
                  Veg/Nonveg
                </div>
                <br />
                <div className="hoverlist" onClick={() => prelistcond(7)}>
                  Offers
                </div>
                <br />
                <div className="hoverlist" onClick={() => prelistcond(8)}>
                  Cost for two
                </div>
                <br />
              </div>

              <div className="rightscroll">
                {hoverlistcond === 1 && sorthover()}
                {hoverlistcond === 2 && Delivertimehover()}
                {hoverlistcond === 3 && Cuisineshover()}
                {hoverlistcond === 4 && Explorehover()}
                {hoverlistcond === 5 && Ratinghover()}
                {hoverlistcond === 6 && Vegornonveg()}
                {hoverlistcond === 7 && offerhover()}
                {hoverlistcond === 8 && Costfortwohover()}
              </div>
            </div>
          </div>

          <div className="hoverfooder">
            <button className="clearfilterbtn" onClick={hoverclearbtn}>
              Clear Filters
            </button>
            <button className="filterapllybtn" onClick={applayfilter}>
              Apply
            </button>
          </div>
        </div>
      </>
    );
  };

  //Hover page inside lists onclick

  //use state for conditional rendering for hover page

  const Hoverclosebtn = () => {
    setfilter(false);
    prelistcond(1);
    setsorthoverratio("sortbyoption1");
    setfastdelveryratio("");
    setswiggyarived("");
    setratinghoverdata("");
    setvegornonveghoverdata("");
    sethoveroffer("");
    sethoverratefortwo("");
  };

  const hoverclearbtn = () => {
    setsorthoverratio("sortbyoption1");
    setfastdelveryratio("");
    setswiggyarived("");
    setratinghoverdata("");
    setvegornonveghoverdata("");
    sethoveroffer("");
    sethoverratefortwo("");
  };

  const [hoverlistcond, prelistcond] = useState(1);

  const sorthover = () => {
    return (
      <>
        <div className="sorthoverpage">
          <div>Sort by</div>
          <div style={{ display: "grid" }}>
            <br />
            <div>
              <input
                type="radio"
                name="relevance"
                value="sortbyoption1"
                checked={sorthoverratio === "sortbyoption1"}
                onChange={sortbyoncange}
              />
              Relevance(Default)
            </div>
            <br />
            <div>
              <input
                type="radio"
                name="deliverytime"
                value="sortbyoption2"
                checked={sorthoverratio === "sortbyoption2"}
                onChange={sortbyoncange}
              />
              Delivery Time
            </div>
            <br />
            <div>
              <input
                type="radio"
                name="rating"
                value="sortbyoption3"
                checked={sorthoverratio === "sortbyoption3"}
                onChange={sortbyoncange}
              />
              Rating
            </div>
            <br />
            <div>
              <input
                type="radio"
                name="lowtohigh"
                value="sortbyoption4"
                checked={sorthoverratio === "sortbyoption4"}
                onChange={sortbyoncange}
              />
              Cost:Low to High
            </div>
            <br />
            <div>
              <input
                type="radio"
                name="hightolow"
                value="sortbyoption5"
                checked={sorthoverratio === "sortbyoption5"}
                onChange={sortbyoncange}
              />
              Cost:High to Low
            </div>
          </div>
        </div>
      </>
    );
  };

  const Delivertimehover = () => {
    return (
      <>
        <div className="sorthoverpage">
          <div>Filter by</div>
          <br />
          <div>
            <input
              type="checkbox"
              value="timeoption"
              onChange={deliverytimechange}
            />
            Fast Delivery
          </div>
        </div>
      </>
    );
  };

  const Cuisineshover = () => {
    return (
      <>
        <div className="sorthoverpage">
          <div>Filter By Cuisines</div>
          {cuisines.map((ele, ind) => (
            <div style={{ display: "grid" }}>
              <br />
              <div>
                <input type="checkbox" value={ele} onChange={cuisinesselect} />
                {ele}
              </div>
              <br />
            </div>
          ))}
        </div>
      </>
    );
  };

  const Explorehover = () => {
    return (
      <>
        <div className="sorthoverpage">
          <div>Filter by</div>
          <br />
          <div>
            <input
              type="checkbox"
              value="newswiggy"
              onChange={swiggyarivedchange}
            />
            New On Swiggy
          </div>
          <br />
          <div>
            <input
              type="checkbox"
              value="exswiggy"
              onChange={swiggyarivedchange}
            />
            Swiggy Exclusive
          </div>
        </div>
      </>
    );
  };

  const Ratinghover = () => {
    return (
      <>
        <div className="sorthoverpage">
          <div>Filter by</div>
          <br />
          <div>
            <input
              type="checkbox"
              value="rating1"
              onChange={ratinghoverchange}
            />
            Rating 4.5+
          </div>
          <br />
          <div>
            <input
              type="checkbox"
              value="rating2"
              onChange={ratinghoverchange}
            />
            Rating 4.0+
          </div>
          <br />
          <div>
            <input
              type="checkbox"
              value="rating3"
              onChange={ratinghoverchange}
            />
            Rating 3.5+
          </div>
        </div>
      </>
    );
  };

  const Vegornonveg = () => {
    return (
      <>
        <div className="sorthoverpage">
          <div>Filter by</div>
          <br />
          <div>
            <input
              type="radio"
              value="pureveg1"
              checked={vegornonveghoverdata === "pureveg1"}
              onChange={vegornonveghoverchange}
            />
            Pure veg
          </div>
          <br />
          <div>
            <input
              type="radio"
              value="nonveg2"
              checked={vegornonveghoverdata === "nonveg2"}
              onChange={vegornonveghoverchange}
            />
            Non-veg
          </div>
        </div>
      </>
    );
  };

  const offerhover = () => {
    return (
      <>
        <div className="sorthoverpage">
          <div>Restaurants With</div>
          <br />
          <div>
            <input
              type="radio"
              value="hoveroffer1"
              checked={hoveroffer === "hoveroffer1"}
              onChange={hoverofferchange}
            />
            Offers
          </div>
        </div>
      </>
    );
  };

  const Costfortwohover = () => {
    return (
      <>
        <div className="sorthoverpage">
          <div>Filter by</div>
          <br />
          <div>
            <input
              type="checkbox"
              value="rate1"
              checked={hoverratefortwo === "rate1"}
              onChange={ratefortwochange}
            />
            Rs. 300-Rs. 600
          </div>
          <br />
          <div>
            <input
              type="checkbox"
              value="rate2"
              checked={hoverratefortwo === "rate2"}
              onChange={ratefortwochange}
            />
            Less than Rs. 300
          </div>
        </div>
      </>
    );
  };

  //sort by btn functions

  const [truedrop, falsedrop] = useState(false);

  const dropref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (truedrop && dropref.current && !dropref.current.contains(e.target)) {
        falsedrop(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [truedrop]);

  const Sortbydrop = () => {
    return (
      <>
        <div class="dropdown-content" ref={dropref}>
          <div className="dropdownbody">
            <br />

            <div style={{ display: "flex" }}>
              <div className="dropdownletters">
                Relevance
                <br />
                (Default)
              </div>

              <div className="inputround">
                <input
                  type="radio"
                  name="relevance"
                  value="sortbyoption1"
                  checked={sorthoverratio === "sortbyoption1"}
                  onChange={sortbyoncange}
                />
              </div>
            </div>
            <br />

            <div style={{ display: "flex" }}>
              <div className="dropdownletters">Delivery Time</div>

              <div className="inputround">
                <input
                  input
                  type="radio"
                  name="deliverytime"
                  value="sortbyoption2"
                  checked={sorthoverratio === "sortbyoption2"}
                  onChange={sortbyoncange}
                />
              </div>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <div className="dropdownletters">Rating</div>

              <div className="inputround">
                <input
                  type="radio"
                  name="rating"
                  value="sortbyoption3"
                  checked={sorthoverratio === "sortbyoption3"}
                  onChange={sortbyoncange}
                />
              </div>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <div className="dropdownletters">Cost:Low to High</div>

              <div className="inputround">
                <input
                  type="radio"
                  name="lowtohigh"
                  value="sortbyoption4"
                  checked={sorthoverratio === "sortbyoption4"}
                  onChange={sortbyoncange}
                />
              </div>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <div className="dropdownletters">Cost:High to Low</div>

              <div className="inputround">
                <input
                  type="radio"
                  name="hightolow"
                  value="sortbyoption5"
                  checked={sorthoverratio === "sortbyoption5"}
                  onChange={sortbyoncange}
                />
              </div>
            </div>
            <br />
          </div>
          {/* <div>
            <div className="dropapplybtn" onClick={applayfilter} >Apply</div>
        </div> */}
        </div>
      </>
    );
  };

  return (
    <>
      <div>{OffHead()}</div>
      <br />
      <br />
      <br />
      <br />
      <div>
        {Offerbar()}
        {filterform && Filterbox()}
        <br />
        <br />
        <br />
        {cardItem()}
        {cuisineItems()}
      </div>
    </>
  );
};
export default Offers;
