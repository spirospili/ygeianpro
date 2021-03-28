import React,{useState,useEffect} from 'react';
import EventDetailImg from "../../../public/images/greys-anatomy.jpg";
import calendarIcon from "../../../public/images/calendar-icon.png";
import pinIcon from "../../../public/images/pin-icon.png";
import { NavLink,useParams } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import Sidebar from './Sidebar';
import TopSearchAndFilter from './TopSearchAndFilter';
import axios from './api'


 function EventDetail(){ 
        let { id } = useParams();
       const [eventDetail, setEventDetail] = useState({})
       useEffect(() => {
        axios.get(`/api/events/${id}`)
        .then((response) => setEventDetail(response.data))
        .then((data) => console.log('This is your data', data));
       }, [])
        
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
                                    <div className="upcoming-events-block event-detail-block">
                                        <div className="row mb-2">
                                            <div className="col-md-12">
                                                <h2 className="heading-style2">Event <span>Detail</span></h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="theme-block-style medical-list">
                                                    <img src={`/storage/${eventDetail.image}`} className="img-fluid" alt="medical" />
                                                    <h4>{eventDetail.name}</h4>
                                                    <ul className="block-style">
                                                        <li>
                                                            <img src={calendarIcon} className="img-fluid" alt="icon" />
                                                            <h6>{eventDetail.start_date}</h6>
                                                        </li>
                                                        <li>
                                                            <img src={pinIcon} className="img-fluid pin-img" alt="icon" />
                                                            <h6>{eventDetail.location}</h6>
                                                        </li>
                                                    </ul>
                                                    <p>{eventDetail.description}</p>
                                                    <NavLink to="#" className="ticket-btn">Buy Ticket</NavLink>
                                                </div>
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
// }
export default EventDetail;