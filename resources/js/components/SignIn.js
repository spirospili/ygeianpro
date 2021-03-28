import React, { Component } from 'react';
import ReactDom from 'react-dom';
import greylogo from "../../../public/images/grey-logo.png";
import emailIcon from "../../../public/images/email-btn.png";
import phoneIcon from "../../../public/images/password-btn.png";
import reCapcha from "../../../public/images/recapcha.png";
import rightBanner from "../../../public/images/authentication.jpg";
import { NavLink, useHistory } from 'react-router-dom';
import FlashMessage from 'react-flash-message';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            error: '',
            formSubmitting: false,
            user: {
                email: '',
                password: '',
                phone: '',
                payment_id: '',
            },
            redirect: props.redirect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
        }
    }

    componentDidMount() {
        const { prevLocation } = this.state.redirect || { prevLocation: { pathname: '/' } };
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({formSubmitting: true});
        let userData = this.state.user;
        axios.post("/api/auth/login", userData).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let userData = {
                    id: json.data.id,
                    image: json.data.image,
                    name: json.data.name,
                    email: json.data.email,
                    phone: json.data.phone,
                    payment_id: json.data.payment_id,
                    access_token: json.data.access_token,
                    payment_info:  json?.data?.payment_info ? JSON.parse(json.data.payment_info) : null ,
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                //let history = useHistory();
                localStorage.setItem("appState", JSON.stringify(appState));
                //localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user,
                    error: ''
                });
                return this.props.history.push('/feed');
            } else {
                alert(`Our System Failed To Register Your Account!`);
            }
        }).catch(error => {if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            let err = error.response.data;
            this.setState({
                error: err.message,
                errorMessage: err.errors,
                formSubmitting: false
            })
        } else if (error.request) {
            // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
            let err = error.request;
            this.setState({
                error: err,
                formSubmitting: false
            })
        } else {
           // Something happened in setting up the request that triggered an Error
            let err = error.message;
            this.setState({
                    error: err,
                    formSubmitting: false
            })
        }
        }).finally(this.setState({error: ''}));
    }
    handleEmail(e) {
      let value = e.target.value;
      this.setState(prevState => ({
        user: {
          ...prevState.user, email: value
        }
      }));
    }
    handlePassword(e) {
      let value = e.target.value;
      this.setState(prevState => ({
        user: {
          ...prevState.user, password: value
        }
      }));
    }

    render() {
        /*const { state = {} } = this.state.redirect;
        const { error } = state;*/
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 p-0">
                            <div className="signup-block signin-block">
                                <NavLink to="/home"><img src={greylogo} className="img-fluid signup-logo" alt="logo" /></NavLink>
                                <h1 className="heading-style2">Hello, <strong>Welcome back!</strong></h1>
                                <p className="login-detial">To stay in touch with us, please login to your company name account.</p>
                                
                                {this.state.isLoggedIn ? <FlashMessage duration={60000} persistOnHover={true}>
                                <h5 className={"alert alert-success"}>Login successful, redirecting...</h5></FlashMessage> : ''}
                                {this.state.error ? <FlashMessage duration={100000} persistOnHover={true}>
                                <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5></FlashMessage> : ''}
                                {/*error && !this.state.isLoggedIn ? <FlashMessage duration={100000} persistOnHover={true}>
                                <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : '' */}
                                    
                                    <form className="signup-form" onSubmit={this.handleSubmit}>
                                        <div className="form-group input-group">
                                            <label>Email Address</label>
                                            <input name="" className="form-control" placeholder="johndoe@gmail.com" type="email" id="email" name="email" onChange={this.handleEmail} required/>
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <img src={emailIcon} className="img-fluid" alt="btn" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="form-group input-group">
                                            <label>Password</label>
                                            <input name="" className="form-control" placeholder="123456789" type="password" id="password" name="password" onChange={this.handlePassword} />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <img src={phoneIcon} className="img-fluid" alt="btn" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row align-items-center remember-check">
                                            <div className="col-md-6">
                                                <div className="form-check">
                                                    <input type="checkbox" checked="checked" className="form-check-input" id="remember" />
                                                    <label className="form-check-label" for="remember">Remember me</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <NavLink to="/forgot" className="forgot-password">Forgot Password?</NavLink>
                                            </div>
                                        </div>
                                        {/*<div className="form-group input-group">
                                            <input name="" className="form-control" type="text" />
                                            <img src={reCapcha} className="recaptcha-img img-fluid" alt="recapcha" />
                                        </div>*/}
                                        <button disabled={this.state.formSubmitting} type="submit" name="singlebutton" className="form-submit-btn"> {this.state.formSubmitting ? "Logging You In..." : "Log In"} </button>
                                    </form>
                                    <p>New to Simpletransfert? <NavLink to="/signup">Signup</NavLink></p>
                            </div>
                        </div>
                        <div className="col-md-7 p-0">
                            <div className="signup-img signin-img">
                                <img src={rightBanner} className="img-fluid" alt="signup" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SignIn;