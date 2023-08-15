import React,{useState} from 'react'
import './HeaderSide.css'
const HeaderSide=({setsidehover,sidehover})=> {

    
  const [sidebar,setsidebar]=useState(true)
  // const [sideover,setsideover]=useState(true)
  
  
  
      const logIn=()=>
      {
        return(<>
        <div className=' HeaderSide_control'>
        <div className='HeaderSide'>

        <div className='HeaderSide_login_img'> <img width={100} height={105} src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'></img> </div>
</div>
          <div onClick={()=>{setsidehover(false)}} style={{fontWeight:500}} className='HeaderSide_but' > X</div>
          <div className='HeaderSide_login'>Login<br/></div>
          <p style={{marginLeft:'-200px'}}>or <a onClick={()=>{setsidebar(false)}} className='HeaderSide_login_account'>create an account</a></p>
          <div className='inputchange inputchange22'>
          <input type='text'  placeholder='Phone Number'></input>
          <button>Login</button>
          <div className='Para'>By clicking on Login ,I accept the Terms & Conditions & Privacy Policy</div>
        </div>
        <br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>        </div>
        </>)
      }
       const createaccount=()=>{
        return(
          <>
          <div className=' HeaderSide_control'>
          <div >
             <div className='HeaderSide'>

        <div className='HeaderSide_login_img'> <img width={100} height={105} src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'></img> </div>
</div>
            <div onClick={()=>{setsidehover(false)}} style={{fontWeight:500}} className='HeaderSide_but'>X</div>
            <div className='HeaderSide_login'>Sign Up</div>
            <p style={{marginLeft:'-180px'}}>or <a href='/'  className='HeaderSide_login_account'>login to your account</a></p>
            
          </div>
          <div className='inputchange change2'>
          <div>  <input type='number' placeholder='Phone Number'></input></div><br/>
           <div> <input type='text' placeholder='Name'></input></div><br/>
           <div> <input type='email' placeholder='Email'></input></div><br/>
          
          <div className='LinkInHeaderSide'><a href='' >Have a referal code?</a> </div>
          <button>Continue</button>
          </div>
          <p className='Para'>By creating an account, I accept the Terms & Conditions & Privacy Policy</p>
          </div>
          </>
        )
       }
  return (
    <div  >
      {sidehover && 
      <div >
      
        { sidebar? logIn(): createaccount()}
      </div>}
    </div>
  )
}

export default HeaderSide