import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import doctorList1 from "../../../public/images/Group1238.png";
import doctorList2 from "../../../public/images/Group1239.png";
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import axios from './api'
import moment from 'moment';

function ViewAllTeams(){
    const [teams, setTeams] = useState({})
    useEffect(() => {
    axios.get(`/api/teams`)
    .then((response) => setTeams(response.data))
    .then((data) => console.log('This is your data', data));
    }, [])

	return (
		<>
			<InnerPageHeader />
                <div className="subheader">
                    <h1 className="heading-style1">Top Teams</h1>
                </div>
                <section className="faqs-section">
                    <div className="container">
                        
                        <div className="row text-center">
                            {Array.isArray(teams) && teams.map((doctor,index) =>
                                <div className="col-md-4">
                                    <NavLink to={`/team-details/${doctor.team_id}`} onClick={() => scrollTo(0,0)}>	
                                    <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />                
                                    <h5>{doctor.team_name}</h5> 
                                        {doctor.speciality}
                                    </NavLink>	
                                    <p>{doctor.description}</p>
                                </div>
                            )}
							
                        </div>
                    </div>
                </section>
\		</>
	)
}

export default ViewAllTeams;