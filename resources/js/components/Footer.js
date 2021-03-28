import React, {useState} from 'react';
import footerLogo from "../../../public/images/Group1204.png";
import newsletterIcon from "../../../public/images/send.png";
import facebookIcon from "../../../public/images/facebook.png";
import instagramIcon from "../../../public/images/instagram.png";
import youtubeIcon from "../../../public/images/you.png";
import twitterIcon from "../../../public/images/twitter.png";
import { NavLink } from 'react-router-dom';
import axios from "./api";
import FlashMessage from "react-flash-message";

const Footer = () => {

    const [email, setEmail] = useState("")
    const [successMessage, setsuccessMessage] = useState("")

    const formSubmit=()=>{


        let formData = new FormData();
        formData.append('email', email);
        setsuccessMessage(null)
        axios.post(`/api/subscribe`,formData,{
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(data=>{
                setsuccessMessage(data.data.message);
                setEmail("")
            })
            .catch(err=>{
            })


    }
	return (
     <>
        <footer>
            <div className="container">
                <div className="footer-newsletter">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h3>Subscribe Newsletter</h3>
                            <p>Subscribe to our newsletters. Be the first to know.</p>
                        </div>
                        <div className="col-md-6">
                            <form action="" className="subscribe-email" onSubmit={(e)=>e.preventDefault()}>
                                <div className="input-group">
                                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email" required />
                                    <span className="input-group-btn">
                                       <button className="btn" type="submit"  onClick={formSubmit} >
                                           <img src={newsletterIcon} className="img-fluid" alt="email" /> 
                                        </button>
                                    </span>
                                </div>

                                {successMessage ?
                                    <>
                                    <br />
                                    <FlashMessage duration={10000} persistOnHover={true}>
                                        <h5 className={"alert alert-success"}> {successMessage}</h5>
                                    </FlashMessage>
                                    </>
                                    : ""
                                }
                            </form>
                        </div>
                    </div>
                </div>
                <div className="footer-listing">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={footerLogo} className="img-fluid footer-logo" alt="logo" />
                            <p>YGEIAN Pro is a multimedia medical company. The best doctors all around the world, from all specialities provide their breakthrough techniques through Live Streaming in the OR from the best hospitals in the world.</p>
                        </div>
                        <div className="col-md-3 pl-5">
                            <h4>Our Links</h4>
                            <ul>
                                {/* <li><NavLink to="/news"  onClick={() => scrollTo(0,0)}>Feeds</NavLink></li> */}
                                <li><NavLink to="/impressum" onClick={() => scrollTo(0,0)}>Impressum</NavLink></li>
                                <li><NavLink to="/cookies" onClick={() => scrollTo(0,0)}>Cookies</NavLink></li>
                                <li><NavLink to="/contact" onClick={() => scrollTo(0,0)}>Contact</NavLink></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h4>Support</h4>
                            <ul>
                                <li><NavLink to="/about" onClick={() => scrollTo(0,0)}>About Us</NavLink></li>
                                <li><NavLink to="/" onClick={() => scrollTo(0,0)}>Faq's</NavLink></li>
                                <li><NavLink to="/" onClick={() => scrollTo(0,0)}>Terms &nbps; Condition</NavLink></li>
                                <li><NavLink to="/" onClick={() => scrollTo(0,0)}>Privacy Policy</NavLink></li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h4>Follow Us</h4>
                            <ul>
                                <li><a href="https://www.facebook.com/"><img src={facebookIcon} className="img-fluid" alt="social" /> Facebook</a></li>
                                <li><a href="https://www.instagram.com/"><img src={instagramIcon} className="img-fluid" alt="social" /> Instagram</a></li>
                                <li><a href="https://www.youtube.com/"><img src={youtubeIcon} className="img-fluid" alt="social" /> YouTube</a></li>
                                <li><a href="https://twitter.com/"><img src={twitterIcon} className="img-fluid" alt="social" /> Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright text-center">
                    <p>Copyright ©2020 Logo. All rights reserved</p>
                </div>
            </div>
        </footer>
     </>
    )
}

export default Footer;