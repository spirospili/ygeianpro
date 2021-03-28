import React from 'react';
import nextBlueIcon from "../../../public/images/next-1.png";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import VideoImgModal from "../../../public/images/video-poster.jpg";
import MedicalPublication from "../../../public/images/doc.jpg";
import { NavLink } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import SidebarDoctor from './SidebarDoctor';
import TopSearchAndFilter from './TopSearchAndFilter';

class DoctorDetails extends React.Component {
    render() { 
        return (
          <>
            <InnerPageHeader />
                <section className="inner-page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                            <SidebarDoctor />
                            </div>
                            <div className="col-md-9">
                                <div className="right-content-area">
                                    <TopSearchAndFilter />
                                    <div className="profile-latest-videos">
                                        <div className="row mb-2">
                                            <div className="col-md-9">
                                                <h2 className="heading-style2">Latest <span>Videos</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                                <NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">		 
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
                                            <div className="col-md-4">
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
                                            <div className="col-md-4">
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
                                    <div className="medical-block">
                                        <div className="row mb-2">
                                            <div className="col-md-9">
                                                <h2 className="heading-style2">Medical <span>Publications</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                                <NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="theme-block-style medical-list">
                                                    <img src={MedicalPublication} className="img-fluid" alt="medical" />
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
                                            <div className="col-md-4">
                                                <div className="theme-block-style medical-list">
                                                    <img src={MedicalPublication} className="img-fluid" alt="medical" />
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
                                            <div className="col-md-4">
                                                <div className="theme-block-style medical-list">
                                                    <img src={MedicalPublication} className="img-fluid" alt="medical" />
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
                    </div>
                </section>
          </>
	    )
    }
}
export default DoctorDetails;