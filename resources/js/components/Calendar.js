import React from 'react';
import nextBlueIcon from "../../../public/images/next-1.png";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import eventImg1 from "../../../public/images/images.jpg";
import eventImg2 from "../../../public/images/images-1.jpg";
import eventImg3 from "../../../public/images/feeds1.png";
import calendarIcon from "../../../public/images/calendar-icon.png";
import pinIcon from "../../../public/images/pin-icon.png";
import { NavLink } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import Sidebar from './Sidebar';
import TopSearchAndFilter from './TopSearchAndFilter';
import moment from 'moment';
import axios from './api'

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          events: [],

        };
        // this.publication =this.publication.bind(this);
    }
    publication(id){
        const userObj=JSON.parse(localStorage.getItem('appState'));
        const userId= userObj.user.id
        const userTocken= userObj.user.access_token
        let formData = new FormData();
        formData.append('_method', 'put');
        axios.post(`/api/publications/${id}?like=1`,formData,{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }
        }).then(response => response)
        .then(response => console.log("data publibation ====>",response));
    }
    componentDidMount() {
    axios.get("/api/events")
    .then(response => response)
    .then(response => this.setState({ events : response.data }));
    }
    render() { 
        const { events } = this.state; 
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
                                    <TopSearchAndFilter />
                                    <div className="upcoming-events-block">
                                        <div className="row mb-2">
                                            <div className="col-md-9">
                                                <h2 className="heading-style2">Current <span>Events</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                                <NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>
                                            </div>	
                                        </div>
                                        <div className="row">
                                            {Array.isArray(events.events) && events.events.map((data,index) =>
                                            <div className="col-md-4" key={index}>
                                              <div className="theme-block-style medical-list">
                                                  <img src={`/storage/${data.image}`} className="img-fluid" alt="medical" />
                                                  <h4>{data.name}</h4>
                                                  <ul className="block-style">
                                                      <li>
                                                          <img src={calendarIcon} className="img-fluid" alt="icon" />
                                                          <h6>{moment(data.start_date).format("DD-MM-YYYY")}</h6>
                                                      </li>
                                                      <li>
                                                          <img src={pinIcon} className="img-fluid pin-img" alt="icon" />
                                                            <h6>{data.location}</h6>
                                                      </li>
                                                     <li>
                                                         <p> {data.description.substring(0,50)} {data.description.length > 50 ? "..." : ""} </p>
                                                     </li>
                                                  </ul>
                                                  <p>{data.content}</p>
                                                  <ul className="event-detail-btn">
                                                      <li><NavLink to={`/eventdetail/${data.id}`}>More Detail</NavLink></li>
                                                      <li><NavLink to={`/eventdetail/${data.id}`}>Buy Ticket</NavLink></li>
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
export default Calendar;