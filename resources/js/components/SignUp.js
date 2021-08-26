import React, {Component, useEffect,useState} from 'react';
import ReactDom from 'react-dom';
import greylogo from "../../../public/images/grey-logo.png";
import emailIcon from "../../../public/images/email-btn.png";
import phoneIcon from "../../../public/images/password-btn.png";
import reCapcha from "../../../public/images/recapcha.png";
import rightBanner from "../../../public/images/authentication.jpg";
import googlePlus from "../../../public/images/google-plus.png";
import fbIcon from "../../../public/images/facebook-btn.png";
import { NavLink } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import axios from './api';
class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isRegistered: false,
          error: '',
          errorMessage: '',
          formSubmitting: false,
          user: {
            name: '',
            email: '',
            password: '',
            type: '',
            speciality:''
        },
        specialities:[],
        redirect: props.redirect,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSpeciality=this.handleSpeciality.bind(this);
    axios.get(`/api/speciality`).then(response=> {this.setState({specialities: response.data.speciality})});

    }
    // 2.2
    // componentWillMount, componentDidMount etc etc that have //componentStuffStuff are known as React Lifecycles which of course //you already know 
    componentWillMount() {
      let state = localStorage["appState"];
      if (state) {
        let AppState = JSON.parse(state);
        this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
      }
      if (this.state.isRegistered) {
        return this.props.history.push("/");
      }
    }
    // 2.3
    componentDidMount() {
      const { prevLocation } = this.state.redirect || {prevLocation: { pathname: '/' } };
      if (prevLocation && this.state.isLoggedIn) {
        return this.props.history.push(prevLocation);
      }
    }
    



    // 2.4
    handleSubmit(e) {
      e.preventDefault();
      this.setState({formSubmitting: true});
      //ReactDOM.findDOMNode(this).scrollIntoView();
      let userData = this.state.user;
      console.log(userData);
      axios.post("/api/auth/signup", userData)
        .then(response => {
          return response;
      }).then(json => { 
          if (json.data.success) {
            let userData = {
              id: json.data.id,
              name: json.data.name,
              email: json.data.email,
              activation_token: json.data.activation_token,
              speciality: json.data.speciality,
            };
            console.log(json.data);
            let appState = {
              isRegistered: true,
              user: userData
            };
            localStorage["appState"] = JSON.stringify(appState);
            this.setState({
              isRegistered: appState.isRegistered,
              user: appState.user
            });

            alert(`Registration completed!`);
            location.href = '/';
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
        }
        else if (error.request) {
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
    handleName(e) {
      let value = e.target.value;
      this.setState(prevState => ({
        user: {
          ...prevState.user, name: value
        }
      }));
    }
    handleSpeciality(e) {
      
      let value = e.target.value;
      this.setState(prevState => ({
        user: {
          ...prevState.user, speciality: value
        }
      }));
    }
    handleType(e) {
      let value = e.target.value;
      this.setState(prevState => ({
        user: {
          ...prevState.user, type: value
        }
      }));
    }
    // 2.5
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
        let errorMessage = this.state.errorMessage;
        let arr = [];
        Object.values(errorMessage).forEach((value) => (
            arr.push(value)
        ));
        return (
            <>
                <div className="container-fluid">
                    <div className="row">  
                        <div className="col-md-5 p-0">
                            <div className="signup-block">
                                <NavLink to="/home"><img src={greylogo} className="img-fluid signup-logo" alt="logo" /></NavLink>
                                <h1 className="heading-style2">Signup</h1>
                                {/*<ul className="signup-social">
                                    <li className="google-btn">
                                        <NavLink to="#">
                                            <img src={googlePlus} className="img-fluid" alt="btn" /> Signup with Google	
                                        </NavLink>
                                    </li>
                                    <li className="fb-btn">
                                        <NavLink to="#">
                                            <img src={fbIcon} className="img-fluid" alt="btn" /> Signup with Facebook	
                                        </NavLink>
                                    </li>
                                </ul>
        <p className="text-center signup-email"><NavLink to="#">Or signup with email</NavLink></p>*/}
                                    {this.state.isRegistered ? <FlashMessage duration={60000} persistOnHover={true}>
                                    <h5 className={"alert alert-success"}>Registration successful, redirecting...</h5></FlashMessage> : ''}
                                    {this.state.error ? <FlashMessage duration={900000} persistOnHover={true}>
                                    <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5>
                                    <ul>
                                        {arr.map((item, i) => (
                                        <li key={i}><h5 style={{color: 'red'}}>{item}</h5></li>
                                        ))}
                                    </ul></FlashMessage> : ''}
                                    <form className="signup-form" onSubmit={this.handleSubmit}>
                                        <div className="form-group input-group">
                                            <label>Name</label>
                                            <input name="name" className="form-control" type="text" onChange={this.handleName} required/>
                                        </div>
                                        <div className="form-group input-group">
                                            <label>Email Address</label>
                                            <input name="email" className="form-control" placeholder="johndoe@gmail.com" required type="email" onChange={this.handleEmail} />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <img src={emailIcon} className="img-fluid" alt="btn" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="form-group input-group">
                                            <label>Password</label>
                                            <input name="password" className="form-control" placeholder="Your Password" type="password" onChange={this.handlePassword}/>
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <img src={phoneIcon} className="img-fluid" alt="btn" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="form-group input-group">
                                            <label>Specialities</label>
                                            <select className="form-control" name="speciality" onChange={this.handleSpeciality} required>
                                                {this.state.specialities.map((data, index)=> <option value={data.speciality}>{data.speciality}</option>)}
                                            </select>
                                        </div> 
                                        <div className="form-group input-group">
                                            <label>Profession</label>
                                            <select className="form-control" name="type" onChange={this.handleType} required>
                                                <option value="">Select Profession</option>
                                                <option value="student">Student</option>
                                                <option value="doctor">Doctor</option>
                                            </select>
                                        </div>
                                        {/*<div className="form-group input-group">
                                            <input name="" className="form-control" type="text" />
                                            <img src={reCapcha} className="recaptcha-img img-fluid" alt="recapcha" />
                                        </div>*/}
                                        <button type="submit" name="singlebutton" className="form-submit-btn" disabled={this.state.formSubmitting ? "disabled" : ""}>Create Account</button>
                                    </form>
                                    <p>By signup, I agree to the Privacy Policy and Terms and Conditions</p>
                                    <p>Have an account? <NavLink to="/signin">Signin</NavLink></p>
                            </div>
                        </div>
                        <div className="col-md-7 p-0">
                            <div className="signup-img">
                                <img src={rightBanner} className="img-fluid" alt="signup" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SignUp;