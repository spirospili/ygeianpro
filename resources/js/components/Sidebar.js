import React,{useEffect,useState} from 'react';
//import '../node_modules/font-awesome/css/font-awesome.min.css';
import userProfileImgDummy from "../../../public/images/user-dummy.png";
import { NavLink } from 'react-router-dom';
import ViewAllPublications from './ViewAllPublications';

function Sidebar(){ 
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    useEffect(() => {
        const userObj=JSON.parse(localStorage.getItem('appState'));
        if(userObj !=null){
            setName(userObj.user.name)
            setImage(userObj.user.image)
        }
    })
	  return (
		<>
            <div className="sidebar-block" style={{paddingTop:"0px"}}>
            {name?
                <div className="profile-detail text-center">
                    {
                        image?
                        <img src={`${baseurl}/storage/${image}`} className="img-fluid" alt="profile" />
                        :
                        <img src={userProfileImgDummy} className="img-fluid" alt="profile" />
                    }
                    <h2>{name}</h2>
                    {/* <h4>General Physician</h4> */}
                    <NavLink to="/setting">Edit Profile</NavLink>
                    {/* <ul>
                        <li><NavLink to="#">Badges</NavLink></li>
                        <li><NavLink to="#">Badges</NavLink></li>
                    </ul> */}
                </div>
                 :""}
                {/* <ul className="user-followers">
                    <li className="text-center">
                        <h3>0.0k</h3>
                        <h6>Followers</h6>
                    </li>
                    <li className="text-center">
                        <h3>0.0k</h3>
                        <h6>Following</h6>
                    </li>
                </ul> */}
                <hr/>
                <ul className="sidebar-menu-list">
                    <li><NavLink to="/feed">Feeds <i className="fa fa-chevron-right"></i></NavLink></li>
                    <li><NavLink to="/liked">Liked <i className="fa fa-chevron-right"></i></NavLink></li>
                    {<li><NavLink to="/most-viewed">Most viewed <i className="fa fa-chevron-right"></i></NavLink></li>}
                    {<li><NavLink to="/publication">Medical Publications<i className="fa fa-chevron-right"></i></NavLink></li>}
                    <li><NavLink to="/news">News <i className="fa fa-chevron-right"></i></NavLink></li>
                    <li><NavLink to="/calendar">Calendar <i className="fa fa-chevron-right"></i></NavLink></li>
                    <li><NavLink to="/invoice">Payment <i className="fa fa-chevron-right"></i></NavLink></li>
                </ul>
            </div>
		</>
	  )
    }

export default Sidebar;