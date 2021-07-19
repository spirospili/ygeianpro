import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import doctorList1 from "../../../public/images/Group1238.png";
import doctorList2 from "../../../public/images/Group1239.png";
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import axios from './api'
import moment from 'moment';

function ViewAllHospitals(){
    const [hospitals, setHospitals] = useState({})
    useEffect(() => {
    axios.get(`/api/hospitals`)
    .then((response) => setHospitals(response.data))
    .then((data) => console.log('This is your data', data));
    }, [])

	return (
		<>
			<InnerPageHeader />
                <div className="subheader">
                    <h1 className="heading-style1">Hospitals</h1>
                </div>
                <section className="faqs-section">
                    <div className="container">
                        
                        <div className="row text-center">
                            {Array.isArray(hospitals) && hospitals.map((doctor,index) =>
                                <div className="col-md-4">
                                    <NavLink to={`/hospital-details/${doctor.id}`} onClick={() => scrollTo(0,0)}>	
                                        <img src={'storage/'+doctor.path} className="img-fluid" alt="doctor" />
                                        <h5>{doctor.hospital_name}</h5>
                                    </NavLink>	
                                    <p>{doctor.description}</p>
                                </div>
                            )}
							
                        </div>
                    </div>
                </section>
		</>
	)
}

export default ViewAllHospitals;