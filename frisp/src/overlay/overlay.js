import { useState } from "react";
import "./overlay.css"




const Overlay = () => {

    const [showOverlay, setShowOverlay] = useState(false)

    const btnClick = () => {
        setShowOverlay(true)
    }

    return (
        <>
            <button onClick={btnClick}>overlay</button>



            {showOverlay && <div className="overlay" onClick={() => setShowOverlay(false)}>
                <div className="box"></div>

            </div>}


        </>
    )
}
export default Overlay;