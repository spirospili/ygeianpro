import React from 'react';
import { NavLink } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';
import nextBlueIcon from "../../../public/images/next-1.png";
import userProfileImg from "../../../public/images/sidebar-profile.png";
import teammember from "../../../public/images/teamnew.png";
import memberlogo from "../../../public/images/teamlogo.png";
import doctorList1 from "../../../public/images/Group1238.png";
import doctorList2 from "../../../public/images/Group1239.png";
import VideoImgModal from "../../../public/images/doc.jpg";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import Footer from './Footer';

function DoctorTeam(){
        return (
          <>
            <InnerPageHeader />
            <section className="inner-page-content doctor-team-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="sidebar-block">
                                <div className="profile-detail text-center">
                                    <span>
                                        <img src={userProfileImg} className="img-fluid" alt="profile" />
                                    </span>
                                    <h2>John Doe</h2>
                                    <h4>General Physician</h4>
                                    <p>Sit amet consectetur adipisicing elit. Tempora, perferendis, corporis. Distinctio odio earum molestiae molestias velit mollitia alias voluptate et facilis blanditiis commodi, iure nemo saepe nobis aut sint.</p>
                                    <p>Sit amet consectetur adipisicing elit. Tempora, perferendis, corporis. Distinctio odio earum molestiae molestias velit mollitia alias voluptate et facilis blanditiis commodi, iure nemo saepe nobis aut sint.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="right-content-area">
                                <div className="row align-items-center mb-4 single-doctor">
                                    <div className="col-md-4">
                                        <img src={teammember} className="img-fluid" alt="doctor" />
                                    </div>
                                    <div className="col-md-5">
                                        <h3>Prapas Ygeian</h3>
                                        <h5>General Physician | Head Doctor</h5>
                                        <img src={memberlogo} className="img-fluid" alt="doctor" />
                                    </div>
                                </div>

                                <div className="profile-latest-videos">
                                    <div className="row mb-2">
                                        <div className="col-md-9">
                                            <h2 className="heading-style2">Team</h2>
                                        </div>
                                        <div className="col-md-3">
                                            <NavLink to="/view-all-doctors" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>
                                        </div>
                                    </div>
                                    <div className="row text-center">
                                        <div className="col-md-4 mb-3">
                                            <NavLink to="/view-all-doctors">	
                                                <img src={doctorList1} className="img-fluid" alt="doctor" />
                                                <h5>Neque porro quisquam</h5>
                                            </NavLink>
                                            <p>Sed ut perspiciatis unde omnis iste natus error sit volu ptatem</p>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <NavLink to="/view-all-doctors">	
                                                <img src={doctorList2} className="img-fluid" alt="doctor" />
                                                <h5>Neque porro quisquam</h5>
                                            </NavLink>
                                            <p>Sed ut perspiciatis unde omnis iste natus error sit volu ptatem</p>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <NavLink to="/view-all-doctors">	
                                                <img src={doctorList1} className="img-fluid" alt="doctor" />
                                                <h5>Neque porro quisquam</h5>
                                            </NavLink>
                                            <p>Sed ut perspiciatis unde omnis iste natus error sit volu ptatem</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-md-9">
                                        <h2 className="heading-style2">Recent <span>Activity</span></h2>
                                    </div>
                                    <div className="col-md-3">
                                        <NavLink to="/ViewAllVideos" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">		 
                                        <div className="theme-block-style">
                                            <NavLink to="#" data-toggle="modal" data-target="#videoModal">
                                                <img src={VideoImgModal} className="img-fluid" alt="medical" />										
                                            </NavLink>		
                                            <h4>Neque porro quisquam</h4>
                                            <ul className="block-style">
                                                <li>
                                                    <img src={likeIcon} className="img-fluid" alt="icon" />
                                                    <h6>137</h6>
                                                </li>
                                                <li>
                                                    <img src={shareIcon} className="img-fluid" alt="icon" />
                                                    <h6>200</h6>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div className="theme-block-style">
                                            <NavLink to="#" data-toggle="modal" data-target="#videoModal">
                                                <img src={VideoImgModal} className="img-fluid" alt="medical" />										
                                            </NavLink>		
                                            <h4>Neque porro quisquam</h4>
                                            <ul className="block-style">
                                                <li>
                                                    <img src={likeIcon} className="img-fluid" alt="icon" />
                                                    <h6>137</h6>
                                                </li>
                                                <li>
                                                    <img src={shareIcon} className="img-fluid" alt="icon" />
                                                    <h6>200</h6>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div className="theme-block-style">
                                            <NavLink to="#" data-toggle="modal" data-target="#videoModal">
                                                <img src={VideoImgModal} className="img-fluid" alt="medical" />										
                                            </NavLink>		
                                            <h4>Neque porro quisquam</h4>
                                            <ul className="block-style">
                                                <li>
                                                    <img src={likeIcon} className="img-fluid" alt="icon" />
                                                    <h6>137</h6>
                                                </li>
                                                <li>
                                                    <img src={shareIcon} className="img-fluid" alt="icon" />
                                                    <h6>200</h6>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  
            <Footer	/>
		  </>
	    )
    }
export default DoctorTeam;