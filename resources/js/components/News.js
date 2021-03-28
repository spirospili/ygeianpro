import React from 'react';
import nextBlueIcon from "../../../public/images/next-1.png";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import VideoImgModal from "../../../public/images/images.jpg";
import eventImg1 from "../../../public/images/images.jpg";
import eventImg2 from "../../../public/images/images-1.jpg";
import eventImg3 from "../../../public/images/feeds1.png";
import newsEvent1 from "../../../public/images/event1.jpg";
import newsEvent2 from "../../../public/images/event2.jpg";
import newsEvent3 from "../../../public/images/event3.jpg";
import calendarIcon from "../../../public/images/calendar-icon.png";
import pinIcon from "../../../public/images/pin-icon.png";
import { NavLink } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import Sidebar from './Sidebar';
import TopSearchAndFilter from './TopSearchAndFilter';
import axios from './api'
import moment from 'moment';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          news: [],
        };
      }
      componentDidMount() {
        axios.get("/api/news")
        .then(response => response)
        .then(response => this.setState({ news : response.data }));
      }
      render() {
        const { news } = this.state.news; 
        return (
          <>
            <InnerPageHeader />
                <section className="inner-page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Sidebar />
                            </div>
                            <div className="col-md-9">
                                <div className="right-content-area">
                                    <TopSearchAndFilter  />
                                    <div className="upcoming-events-block">
                                        <div className="row mb-2">
                                            <div className="col-md-9">
                                                <h2 className="heading-style2">News <span></span></h2>
                                            </div>
                                            <div className="col-md-3">
                                                <NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>
                                            </div>	
                                        </div>
                                        <div className="row">
                                            {news && news.length ?
                                            "":<h5>There is no news from the doctor you have followed.</h5>
                                            }
                                           {Array.isArray(news) && news.map((data,index) =>
          
                                            <div className="col-md-4" key={index}>
                                                <div className="theme-block-style medical-list">
                                                      <NavLink to={`/newsdetail/${data.id}`}>   
                                                        <img src={`/storage/${data.image}`} className="img-fluid" alt="medical" />
                                                        <h4>{data.title}</h4>
                                                      </NavLink>    
                                                        <ul className="block-style">
                                                            <li>
                                                                <img src={likeIcon} className="img-fluid" alt="icon" />
                                                                <h6>0</h6>
                                                            </li>
                                                            <li>
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>0</h6>
                                                            </li>
                                                        </ul>
                                                    </div>
                                            </div>

                                            
                                            )}
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
export default News;