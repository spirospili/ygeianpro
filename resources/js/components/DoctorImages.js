import React from 'react';
import nextBlueIcon from "../../../public/images/next-1.png";
import topDoctor1 from "../../../public/images/Group1238.png";
import topDoctor2 from "../../../public/images/Group1239.png";
import { NavLink } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import SidebarDoctor from './SidebarDoctor';
import TopSearchAndFilter from './TopSearchAndFilter';

class DoctorImages extends React.Component {
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
                                    <div class="medical-block">
                                        <div class="row mb-2">
                                            <div class="col-md-9">
                                                <h2 class="heading-style2">Doctor <span>Images</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                                <NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>
                                            </div>
                                        </div>
                                        <div class="row mb-5">
                                            <div className="col-md-4">
                                                <div className="medical-list">
                                                    <img src={topDoctor1} className="img-fluid" alt="doctor" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="medical-list">
                                                    <img src={topDoctor2} className="img-fluid" alt="doctor" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="medical-list">
                                                    <img src={topDoctor1} className="img-fluid" alt="doctor" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div className="col-md-4">
                                                <div className="medical-list">
                                                    <img src={topDoctor1} className="img-fluid" alt="doctor" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="medical-list">
                                                    <img src={topDoctor2} className="img-fluid" alt="doctor" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="medical-list">
                                                    <img src={topDoctor1} className="img-fluid" alt="doctor" />
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
export default DoctorImages;