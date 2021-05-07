import React,{useEffect,useState} from 'react';
//import '../node_modules/font-awesome/css/font-awesome.min.css';
import userProfileImg from "../../../public/images/sidebar-profile.png";
import { NavLink,useParams } from 'react-router-dom';
import axios from './api'

function SidebarDoctor(){ 
    let formData = new FormData();
    let { id } = useParams();
    const [name, setName] = useState("")
    const [trigger, setTrigger] = useState(false)
    const [follows, setFollows] = useState({})
    useEffect(() => {
        const userObj=JSON.parse(localStorage.getItem('appState'));
        if(userObj !=null){
            setName(userObj.user.name)
        }
    })
    useEffect(() => {
        const userObj=JSON.parse(localStorage.getItem('appState'));
        const userTocken= userObj.user.access_token
        console.log("idchecker ======>",id)
        if(id !=undefined){
        localStorage.setItem('doctorid',id)
        }
        const docId =localStorage.getItem('doctorid')
        axios.get(`/api/doctors/${docId}`,{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }}).then(response=> {console.log("doctor follow",response.data);
            setFollows(response.data)})
            setTrigger(false)
    },[trigger])
    const follow =()=>{
        if( localStorage.getItem('doctorFOllow'+id)<1){
        const userObj=JSON.parse(localStorage.getItem('appState'));
        const userTocken= userObj.user.access_token;
        formData.append('doctor_id', id);
        axios.post("/api/doctors",formData,{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            },}).then(response=>{ console.log("doctor follow",response);setTrigger(true)} )
            localStorage.setItem('doctorFOllow'+id,"2")

        }
    }
	  return (
		<>
       
            <div className="sidebar-block">
                
            {name?
                <div className="profile-detail text-center">
                   <span> <img src={`${baseurl}/storage/${follows.path}`} className="img-fluid" alt="profile" /></span>
                    <h2>{follows.name}</h2>
                    <h4>{follows.speciality}</h4>
                   {follows.tags?
                    
                    <ul>
								{/* <li><a href="#">Badges</a></li> */}
								<li><a href="#">{follows.tags}</a></li>
							</ul>:""}
                </div>
            :""}
                <ul className="user-followers">
                    <li className="text-center" onClick={()=>follow()}>
                        <h3>{follows.followers_count}</h3>
                        <h4 style={{"margin-bottom":"25px"}}>Followers</h4>
                        <h6>Follow</h6>
                    </li>
                    
                </ul>
                <ul className="sidebar-menu-list">
                    <li><NavLink to="/doctor-videos">Videos <i className="fa fa-chevron-right"></i></NavLink></li>
                    <li><NavLink to="/doctor-images">Images <i className="fa fa-chevron-right"></i></NavLink></li>
                    <li><NavLink to="/doctor-documents">Document listing <i className="fa fa-chevron-right"></i></NavLink></li>
                    <li><NavLink to="/viewallteams">Team <i className="fa fa-chevron-right"></i></NavLink></li>
                </ul>
            </div>
		</>
	  )
    }
export default SidebarDoctor;