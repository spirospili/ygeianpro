import React, { Component } from 'react';
import ReactDom from 'react-dom';
import favicon from "../../../public/images/favicon.png";
import aboutImg1 from "../../../public/images/olga-guryanova-rWiso0uMjAs-unsplash.jpg";
import aboutImg2 from "../../../public/images/national-cancer-institute-KrsoedfRAf4-unsplash.jpg";
import { NavLink, useHistory } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Pricing extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
			notifications: null,
			user: props.userData,
			isLoggedIn: props.userIsLoggedIn,
			paymentInfo: null
		};
	}

	updateState(payment_info){
		console.log("payment_info",payment_info)
        let state = localStorage["appState"];

        if (state) {
            let AppState = JSON.parse(state);
            AppState.user.payment_info = JSON.parse(payment_info);
            localStorage.setItem("appState",JSON.stringify(AppState))
        }
	}

	componentWillMount() {
		let state = localStorage["appState"];
	
		if (state) {
			let AppState = JSON.parse(state);
			this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
		}
	}

	render(){
		const onSuccess = (payment, info) => {

            const userObj=JSON.parse(localStorage.getItem('appState'));
			const userObjUpdated={...userObj}
			userObjUpdated.user.payment_id=payment.paymentID;
			localStorage.setItem("appState", JSON.stringify(userObjUpdated));
			
			//Storing Payment ID to user record
			//let history = useHistory();
			const userId = userObjUpdated.user.id;
			const userTocken= userObjUpdated.user.access_token;
        	let formData = new FormData();

			formData.append('payment_id', JSON.stringify(payment));
			formData.append('package', info);
			formData.append('_method', 'patch');

			axios.post(`/api/auth/profile/${userId}`,formData,{
				headers: {    
					'Accept' : 'application/json',
					'Authorization': `Bearer ${userTocken}`,
				}
			}).then(data=>{
				this.updateState(data.data.payment_info);
				return this.props.history.push('/feed');
				//history.push("/feed");
			})
			// 1, 2, and ... Poof! You made it, everything's fine and dandy!
			//console.log("Payment successful!", payment);
			alert('Thank you. Your payment is successfull');

			// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
		}

		const onCancel = (data) => {
			// The user pressed "cancel" or closed the PayPal popup
			console.log('Payment cancelled!', data);
			alert('Payment Failed');
			// You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
		}

		const onError = (err) => {
			// The main Paypal script could not be loaded or something blocked the script from loading
			console.log("Error!", err);
			alert('Payment Failed');
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
		}

		let env = 'sandbox'; // you can set this string to 'production'
		let currency = 'USD'; // you can set this string from your props or state  
		let package1 = 70; 
		let package2 = 600; // this is the total amount (based on currency) to charge
		// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

		const client = {
			sandbox:    'AboJPsDIg40RqUr3L8LbPresq0JPA_-7S6_XFX9FZSExLyF3PS5EH1KkeMo0r5gYWeYI7SNH4adt4X7Z',
			production: 'YOUR-PRODUCTION-APP-ID',
		}
		// In order to get production's app-ID, you will have to send your app to Paypal for approval first
		// For your sandbox Client-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App" unless you have already done so):
		//   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
		// Note: IGNORE the Sandbox test AppID - this is ONLY for Adaptive APIs, NOT REST APIs)
		// For production app-ID:
		//   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

		// NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
		
		return (
			<>
				<InnerPageHeader />
				<div className="subheader">
					<h1 className="heading-style1">Pricing</h1>
				</div>
				<section className="content-section pricing-page-block text-center">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<h2>Learn from the best professional doctors around the world</h2>
								<h4>start 3 days free trial</h4>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="pricing-block">
									<img src={favicon} className="img-fluid" alt="logo" />
									<h5>Monthly</h5>
									<div className="discount-price">
										<h2>${package1}</h2>
										<p>30% discount for Students</p>
									</div>
									{this.state.isLoggedIn ?
									<div className="theme-btn">

										<PaypalExpressBtn env={env} client={client} currency={currency} total={package1} onError={onError} onSuccess={(payment) => onSuccess(payment, package1)} onCancel={onCancel} />

									</div> : 
									<NavLink to="signin" class="theme-btn">Login To Purchase</NavLink>
									}
									{/* <a href="#" className="theme-btn">Select</a> */}
								</div>
							</div>
							<div className="col-md-6">
								<div className="pricing-block text-center">
									<img src={favicon} className="img-fluid" alt="logo" />
									<h5>Yearly</h5>
									<div className="discount-price">
										<h2>${package2}</h2>
										<p>30% discount for Students</p>
									</div>
									{this.state.isLoggedIn ?
									<div className="theme-btn">
									<PaypalExpressBtn env={env} client={client} currency={currency} total={package2} onError={onError} onSuccess={(payment) => onSuccess(payment, package2)} onCancel={onCancel} />
									</div> : 
									<NavLink to="signin" class="theme-btn">Login To Purchase</NavLink>
									}
									{/* <a href="#" className="theme-btn">Select</a> */}
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		)
	}
}

export default Pricing;
