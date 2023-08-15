import { useState } from 'react'
import './SliderPopup.css';

const MainFilter = ({ cuisines, onClose }) => {

  const [checkboxes, setCheckboxes] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckboxes([...checkboxes, value]);
    } else {
      setCheckboxes(checkboxes.filter((checkbox) => checkbox !== value));
    }
    // console.log(checkboxes);
  };
  const btnclear = () => {
    // setCheckboxes((checkboxes) =>
    // checkboxes.map((checkbox) => ({ ...checkbox }))
    // );
    //bindCuisions(checkboxes);
  }
  const btnshowrest = (event) => {
    event.preventDefault();
    // console.log(checkboxes);
    onClose();
  }
  const bindCuisions = () => {
    return cuisines.map((cuisines, index) => {
      return (
        <div key={index}>
          <input className="checkboxcus" id={index} name="CUISINES" type="checkbox" value={cuisines} 
            onChange={handleCheckboxChange} />
          <label className='lblcus' htmlFor="myCheckbox">{cuisines}</label>
        </div>
      )
    })

  }
  return (
    <>
      <div className="slider-popup">
        <div className="overlay" onClick={onClose}></div>
        <div className="popup-content">
          <div className="divfilter"><span className="close" onClick={onClose}></span><div className="filter">Filters</div></div>
          <div className='divCuision'>
            <div className='CuisinesHeader'>Cuisines</div>
            <div className='listofCus'>
              {bindCuisions()}
            </div>
          </div>
          <div className="divCuisionFooter">
            <div className='divfotbtn'>
              <button className='btnClear' onClick={btnclear}>CLEAR</button>
              <button className='btnshow' onClick={btnshowrest} >SHOW RESTAURANTS</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default MainFilter;