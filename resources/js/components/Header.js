import React, { Component } from 'react';
import Avatar from 'react-avatar';
import notificationBlackIcon from "../../../public/images/notification.png";
import logo from "../../../public/images/Group1202.png";
import notificationIcon from "../../../public/images/notification.png";
import menImg from "../../../public/images/men-1.png";
import langIcon from "../../../public/images/Untitled1111.png";
import { NavLink, useHistory } from 'react-router-dom';

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			notifications: null,
			user: props.userData,
			isLoggedIn: props.userIsLoggedIn,
			showNotificationBadge: false
		};
		this.logOut = this.logOut.bind(this);
		this.readNotifications = this.readNotifications.bind(this);
	}

	
	  // 1.2
	logOut() {
		let appState = {
			isLoggedIn: false,
			user: {}
		};
		localStorage["appState"] = JSON.stringify(appState);
		this.setState(appState);
		this.props.history.push('/signin');
	}

	componentDidMount() {
        this.getNotifications();
    }
  
    async getNotifications() {
		console.log("notif");
        if (! this.state.notifications) {
            try {
                this.setState({ isLoading: true });
				//const accessToken = await this.props.auth.getAccessToken();
				const userTocken = this.state.user.access_token;
				axios.get("/api/auth/profile",{
					headers: {      
						'Accept' : 'application/json',
						'Authorization': `Bearer ${userTocken}`,
					}})
				.then((response) => this.setState({notifications: response.data.notifications, isLoading: false, showNotificationBadge: true}));
				this.setState({ isLoading: false });
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }


    async readNotifications() {
            const userTocken = JSON.parse(localStorage.getItem("appState"))?.user?.access_token;
            axios.get("/api/auth/profile?notiifcation=mark_read",{
                headers: {
                    'Accept' : 'application/json',
                    'Authorization': `Bearer ${userTocken}`,
                }})
				.then(() => this.setState({showNotificationBadge: false}))
				.catch(err => console.log(err))


    }

	render(){
		return (
		<>
			<header>
				<nav className="navbar navbar-expand-lg static-top">
					<div className="container">
						<NavLink className="navbar-brand main-logo" to="/">
							<img src={logo} className="img-fluid" alt="logo" />
						</NavLink>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
							<span></span>
							<span></span>
							<span></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarResponsive">
							<ul className="navbar-nav w-100">
								<li className="nav-item">
								{this.state.isLoggedIn ?
									<NavLink activeClassName="activemenu" exact className="nav-link" to="/feed">Home</NavLink>                                   
									:
									<NavLink activeClassName="activemenu" exact className="nav-link" to="/">Home</NavLink>                                   
								}
									</li>
								<li className="nav-item">
									<NavLink activeClassName="activemenu" className="nav-link" to="/about">About Us</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/pricing">Pricing</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/contact">Support</NavLink>
								</li>
								{this.state.isLoggedIn ?
								<li className="user-profile dropdown mobileSHow">
									<NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
										<Avatar name={this.state.user.name} className="colorBlack"/>
									</NavLink>
									<div className="dropdown-menu">
										<NavLink className="dropdown-item" to="/feed">Profile</NavLink>
										<NavLink className="dropdown-item" to="/invoice">Invoice</NavLink>
										<button
											className="dropdown-item"
											onClick={()=>{localStorage.removeItem("appState");window.location.reload();localStorage.clear();}} refresh="true"
											>
											Logout
											</button>
									</div>
								</li> : 
								<li className="user-profile dropdown mobileSHow">
									<NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
										Account
									</NavLink>
									<div className="dropdown-menu">
										<NavLink className="dropdown-item" to="/signin">Sign In</NavLink>
										<NavLink className="dropdown-item" to="/signup">Sign Up</NavLink>
									</div>
								</li>
								}	
							</ul>
						</div>
					
						<div className="right-menu ">
							<ul>
							<li className="dropdown">
							{this.state.isLoggedIn?
							<>
							<NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown" onClick={this.readNotifications} >
								<img src={notificationBlackIcon} className="img-fluid top-notification" alt="notification" />
                                { (this.state.showNotificationBadge && Array.isArray(this.state.notifications)) && this.state.notifications.length > 0 ? <span className="badge badge-danger"> { this.state.notifications.length} </span>  : ""}

							</NavLink>
							<div className="dropdown-menu">
								{Array.isArray(this.state.notifications) && this.state.notifications.map((data,index) =>
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
								{/*<li>
									<NavLink to="/">
										<img src={notificationIcon} className="img-fluid top-notification" alt="notification" />
									</NavLink>
								</li>*/}
								{this.state.isLoggedIn ?
								<li className="user-profile dropdown ">
									<NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
										<Avatar name={this.state.user.name}/>
									</NavLink>
									<div className="dropdown-menu">
										<NavLink className="dropdown-item" to="/feed">Profile</NavLink>
										<button
											className="dropdown-item"
											onClick={()=>{localStorage.removeItem("appState");window.location.reload();localStorage.clear();}}
											>
											Logout
											</button>
									</div>
								</li> : 
								<li className="user-profile dropdown">
									<NavLink className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown">
										Account
									</NavLink>
									<div className="dropdown-menu">
										<NavLink className="dropdown-item" to="/signin">Sign In</NavLink>
										<NavLink className="dropdown-item" to="/signup">Sign Up</NavLink>
									</div>
								</li>
								}

								
							</ul>
						</div>
					</div>
				</nav>
			</header> 
		</>
		)
	}
}

export default Header;