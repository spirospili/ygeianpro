import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import doctorList1 from "../../../public/images/Group1238.png";
import doctorList2 from "../../../public/images/Group1239.png";
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import axios from './api'
import moment from 'moment';

function ViewAllMasterclasses(){
    const [videos, setVideos] = useState({})
    useEffect(() => {
    axios.get(`/api/masterclasses`)
    .then((response) => setVideos(response.data))
    .then((data) => console.log('This is your data', data));
    }, [])

	return (
		<>
			<InnerPageHeader />
                <div className="subheader">
                    <h1 className="heading-style1">Masterclasses</h1>
                </div>
                <section className="faqs-section">
                    <div className="container">
                        
                        <div className="row text-center">
                            {Array.isArray(videos) && videos.map((doctor,index) =>
                                <div className="col-md-4">
                                      <NavLink to={`/masterclass-detail/${doctor.id}/0`}>
                                                        {/* {localStorage.setItem('videourl'+data.id,data.video)}
                                                        {localStorage.setItem('videoTitle'+data.id,data.name)} */}
                                                        <video width="100%" className="videoHeight" >
                                                            <source src={`${baseurl}/storage/${doctor?.subclasses[0]?.path}`} type="video/mp4" />
                                                        </video>								
                                       </NavLink>	
                                    <h4>{doctor.masterclass_title}</h4>
                                    <p>{doctor.description}</p>
                                </div>
                            )}
							
                        </div>
                    </div>
                </section>
\		</>
	)
}

export default ViewAllMasterclasses;