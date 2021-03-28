import React,{useEffect,useState} from 'react';
import {useHistory} from "react-router-dom"
import Avatar from 'react-avatar';
import greylogo from "../../../public/images/grey-logo.png";
import notificationBlackIcon from "../../../public/images/black-notification.png";
import menImg from "../../../public/images/men-1.png";
import langIcon from "../../../public/images/Untitled1111.png";
import { NavLink } from 'react-router-dom';

const InnerPageHeader = () => {
	let history = useHistory();
	const logOut=()=>{
		localStorage.clear();
		localStorage.removeItem("appState")
		
		setTimeout(	history.push("/"), 3000)
	}

	const [name, setName] = useState("")
	const [showNotificationBadge,setShowNotificationBadge] = useState(false);

	useEffect(() => {
			const userObj=JSON.parse(localStorage.getItem('appState'));
			if(userObj !=null){
					setName(userObj.user.name)
			}
	},[name])


		const [notifications, setNotifications] = useState({})
		const userObj=JSON.parse(localStorage.getItem('appState'));
		if(userObj !=null){
			const userTocken= userObj.user.access_token
			useEffect(() => {
			axios.get("/api/auth/profile",{
				headers: {      
					'Accept' : 'application/json',
					'Authorization': `Bearer ${userTocken}`,
				}})
			.then((response) => {setNotifications(response.data.notifications); setShowNotificationBadge(true)});
			}, [])
		}

    async function readNotifications() {
        const userTocken = JSON.parse(localStorage.getItem("appState"))?.user?.access_token;
        axios.get("/api/auth/profile?notiifcation=mark_read",{
            headers: {
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }})
            .then(() => setShowNotificationBadge(false))
            .catch(err => console.log(err))


    }
		
        
	return (
     <>
		<header className="relative-header">
			<nav className="navbar navbar-expand-lg static-top">
			<div className="container">
				<NavLink className="navbar-brand main-logo" to="/">
					<img src={greylogo} className="img-fluid" alt="logo" />
				</NavLink>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				<span></span>
							<span></span>
							<span></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarResponsive">
				<ul className="navbar-nav w-100">
					<li className="nav-item">
						{name?
						<NavLink activeClassName="activemenu" exact className="nav-link" to="/feed">Home</NavLink>                                   
							:
					<NavLink activeClassName="activemenu" exact className="nav-link" to="/">Home</NavLink>
					}
						</li>
					<li className="nav-item">
						<NavLink activeClassName="activemenu" className="nav-link" to="/about">About Us</NavLink>
					</li>
					<li className="nav-item">
						<NavLink activeClassName="activemenu" className="nav-link" to="/pricing">Pricing</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/contact">Support</NavLink>
					</li>
					<li className="user-profile dropdown mobileSHow">
						{name?
							<><NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
								<Avatar className="black" name={name} />
							</NavLink>
							
							<div className="dropdown-menu">
								<NavLink className="dropdown-item" to="/feed">Profile</NavLink>
								<NavLink className="dropdown-item" to="/invoice">Invoice</NavLink>
								<button className="dropdown-item" 		onClick={()=>logOut()}>Logout</button>
									</div>
									</>:
							<><NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
							Account
						</NavLink>
						<div className="dropdown-menu">
							<NavLink className="dropdown-item" to="/signin">Sign In</NavLink>
							<NavLink className="dropdown-item" to="/signup">Sign Up</NavLink>
						</div></>}
						</li>
				</ul>
				</div>
			
			
				<div className="right-menu">
					<ul>
						<li className="dropdown"> 
							{name?
							<>
							<NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown" onClick={readNotifications}>
								<img src={notificationBlackIcon} className="img-fluid top-notification" alt="notification" />
                                { (showNotificationBadge && Array.isArray(notifications)) && notifications.length > 0 ? <span className="badge badge-danger"> { notifications.length} </span>  : ""}
							</NavLink>
							<div className="dropdown-menu">
								{Array.isArray(notifications) && notifications.map((data,index) =>
								<div>
								{data.data.doctor? 
									<NavLink className="dropdown-item" to={`/doctor-details/${data.data.doctor.id}`}>
										{data.data.title}
										<p><small>{data.data.body}</small></p>
									</NavLink>
									:
									<NavLink className="dropdown-item" to="/">
										{data.data.title}
										<p><small>{data.data.body}</small></p>
									</NavLink>
								}
								</div>
								)}
							</div></>: 
							null}
							</li>
						{/* <li>
							<NavLink className="nav-link" to="/SignIn">
								Login
							</NavLink>
						</li> */}
						<li className="user-profile dropdown">
						{name?
							<><NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
								<Avatar className="black" name={name} />
							</NavLink>
							
							<div className="dropdown-menu">
								<NavLink className="dropdown-item" to="/feed">Profile</NavLink>
								<button className="dropdown-item" 		onClick={()=>logOut()}>Logout</button>
									</div>
									</>:
							<><NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
							Account
						</NavLink>
						<div className="dropdown-menu">
							<NavLink className="dropdown-item" to="/signin">Sign In</NavLink>
							<NavLink className="dropdown-item" to="/signup">Sign Up</NavLink>
						</div></>}
						</li>
					</ul>
				</div>
			</div>
			</nav>
		</header> 
     </>
    )
}

export default InnerPageHeader;

