import React from 'react'
// import './Con&foot.css';

import './Header/Container.css'

import { FaApple, FaGooglePlay, FaTwitter, FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";
import { SiFrisp } from "react-icons/si";
function Footer() {
    return (
        <>
            <section>
                <div className="footer">
                    <div className="company">
                        <div className="foothead">COMPANY</div>
                        <div className="comp">About us</div>
                        <div className="comp">Team</div>
                        <div className="comp">Careers</div>
                        <div className="comp">Frisp Blog</div>
                        <div className="comp">Bug Bountry</div>
                        <div className="comp">Frisp One</div>
                        <div className="comp">Frisp Corporate</div>
                        <div className="comp">Frisp Instament</div>
                        <div className="comp">Frisp Genie</div>
                    </div>
                    <div className="contact">
                        <div className="foothead">CONTACT</div>
                        <div className="comp">Help & Support</div>
                        <div className="comp">Partner with us</div>
                        <div className="comp">Ride with us</div>
                    </div>
                    <div className="legal">
                        <div className="foothead">LEGAL</div>
                        <div className="comp">Terms & Conditions</div>
                        <div className="comp">Refund & Cancellation</div>
                        <div className="comp">Privacy Policy</div>
                        <div className="comp">cookie Policy</div>
                        <div className="comp">Offer Terms</div>
                        <div className="comp">Phishing & Fraud</div>
                        <div className="comp">Corporate - Frisp Money Codes Terms and Conditions</div>
                        <div className="comp">Corporate - Frisp Discount Voucher Terms and Conditions</div>
                    </div>
                    <div>
                        <div className='store'>
                            <FaApple className='apple' />
                            <div className='upp'>
                                <div className='comp1'>Download on the</div>
                                <div className='appstr'>App Store</div>
                            </div>
                        </div>
                        <div className='store'>
                            <FaGooglePlay className='plystr' />
                            <div className='upp'>
                                <div className='comp1'>Download on the</div>
                                <div className='appstr'>Play Store</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="foothead1">
                    <div className="tit foothead">WE DELIVER TO</div>
                    <div style={{ display: "flex" }}>
                        <div className="compan">
                            <div className="comp">Abohar</div>
                            <div className="comp">Adilabad</div>
                            <div className="comp">Aadityapur</div>
                            <div className="comp">Adoni</div>
                            <div className="comp">Agartala</div>
                            {/* <div className="comp">Agra</div>
                        <div className="comp">Ahmedabad</div>
                        <div className="comp">Ahmednagar</div>
                        <div className="comp">Aizawal</div>
                        <div className="comp">Ajmer</div>
                        <div className="comp">Akola</div>
                        <div className="comp">Alappuzha</div>
                        <div className="comp">Aligarh</div>
                        <div className="comp">Alipurduar</div>
                        <div className="comp">Allahabad</div>
                        <div className="comp">Almora</div>
                        <div className="comp">Alwar</div>
                        <div className="comp">Ambikapur</div>
                        <div className="comp">Ambur</div>
                        <div className="comp">Aambajogai</div>
                        <div className="comp">Aambala</div>
                        <div className="comp">Amravati</div>
                        <div className="comp">Amreli</div>
                        <div className="comp">Amritsar</div>
                        <div className="comp">Anand</div>
                        <div className="comp">Anantapur</div>
                        <div className="comp">Ankleshwar</div>
                        <div className="comp">Aarakkonam</div> */}
                        </div>
                        <div className="compan">
                            <div className="comp">Dehradun</div>
                            <div className="comp">Dehri</div>
                            <div className="comp">Delhi</div>
                            <div className="comp">Deoghar</div>
                            <div className="comp">Deoria-City</div>
                            {/* <div className="comp">Dewas</div>
                        <div className="comp">Dhanbad</div>
                        <div className="comp">Dhar</div>
                        <div className="comp">Dharmashala</div>
                        <div className="comp">Dharapuram</div>
                        <div className="comp">Dharmapuri</div>
                        <div className="comp">Dharwad</div>
                        <div className="comp">Dholpur</div>
                        <div className="comp">Dhule</div>
                        <div className="comp">Dibrugarh</div>
                        <div className="comp">Digboi</div>
                        <div className="comp">Dimapur</div>
                        <div className="comp">Dindugul</div>
                        <div className="comp">Diu</div>
                        <div className="comp">Doddaballapura</div>
                        <div className="comp">Duliajan</div>
                        <div className="comp">Dumka</div>
                        <div className="comp">Dungapur</div>
                        <div className="comp">Durgapur</div>
                        <div className="comp">Eluru</div>
                        <div className="comp">Erode</div>
                        <div className="comp">Etah</div>
                        <div className="comp">Etawah</div> */}
                        </div>
                        <div className="compan">
                            <div className="comp">Kharagpur</div>
                            <div className="comp">Kishanganj</div>
                            <div className="comp">Kishangarh</div>
                            <div className="comp">Kochi</div>
                            <div className="comp">Kodaikanal</div>
                            {/* <div className="comp">Kohima</div>
                        <div className="comp">Kokrajhar</div>
                        <div className="comp">Kolar</div>
                        <div className="comp">Kolhapur</div>
                        <div className="comp">Kolkata</div>
                        <div className="comp">Kollam</div>
                        <div className="comp">Koppal</div>
                        <div className="comp">Korba</div>
                        <div className="comp">Kotdwar</div>
                        <div className="comp">Kothagudem</div>
                        <div className="comp">Kottayam</div>
                        <div className="comp">Kovilpatti</div>
                        <div className="comp">Kozhikode</div>
                        <div className="comp">Krishnagiri</div>
                        <div className="comp">Krishnanagar</div>
                        <div className="comp">Kullu</div>
                        <div className="comp">Kumbakonam</div>
                        <div className="comp">Kurnool</div>
                        <div className="comp">Kurukshetra</div>
                        <div className="comp">Kushalnagar</div>
                        <div className="comp">Lakhimpur</div>
                        <div className="comp">Lalitpur</div>
                        <div className="comp">Latar</div> */}
                        </div>
                        <div className="compan">
                            <div className="comp">Pusad</div>
                            <div className="comp">Puttur</div>
                            <div className="comp">Rae-Bareli</div>
                            <div className="comp">Raghunathpur</div>
                            <div className="comp">Raichur</div>
                            {/* <div className="comp">Raigani</div>
                        <div className="comp">Rraigarh</div>
                        <div className="comp">Raipur</div>
                        <div className="comp">Rajahmundry</div>
                        <div className="comp">Rajampet</div>
                        <div className="comp">Rajapalayam</div>
                        <div className="comp">Rajgarh</div>
                        <div className="comp">Rajkot</div>
                        <div className="comp">Rajnandgaon</div>
                        <div className="comp">Rajsamand</div>
                        <div className="comp">Ramagundam</div>
                        <div className="comp">Ramanagara</div>
                        <div className="comp">Ramanathapuram</div>
                        <div className="comp">Ramgarh</div>
                        <div className="comp">Rampur</div>
                        <div className="comp">Ranaghat-Wb</div>
                        <div className="comp">Ranchi</div>
                        <div className="comp">Rangia</div>
                        <div className="comp">Rangpo</div>
                        <div className="comp">Raniganj</div>
                        <div className="comp">Ratlam</div>
                        <div className="comp">Ratnagiri</div>
                        <div className="comp">Ravulapalem</div> */}
                        </div>
                    </div>
                </div>
                <div className='footericon'>
                    <div className='footer_icon'>
                        <div className='swiggyicon'>

                            <div className='swiggyname'>F R I S P</div>
                        </div>
                        <div className='year'>
                            © 2023 Frisp
                        </div>
                        <div className='socialicon'>
                            <FaFacebookF className='_icon' />
                            <FaPinterest className='_icon' />
                            <FaInstagram className='_icon' />
                            <FaTwitter className='_icon' />

                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default Footer;