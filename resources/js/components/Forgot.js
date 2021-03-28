import React, {Component} from 'react';
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

class Forgot extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isRegistered: false,
          error: '',
          errorMessage: '',
          formSubmitting: false,
          user: {
            email: '',
        },
        redirect: props.redirect,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
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
      axios.post("/api/auth/forgot", userData)
        .then(response => {
          return response;
      }).then(json => {
          alert(`An email has been sent to reset the password.`);
          location.href = '/';
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
    
    handleEmail(e) {
      let value = e.target.value;
      this.setState(prevState => ({
        user: {
          ...prevState.user, email: value
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
                                <h1 className="heading-style2">Forgot Password</h1>
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
                                            <label>Email Address</label>
                                            <input name="email" className="form-control" placeholder="johndoe@gmail.com" type="email" onChange={this.handleEmail} required />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <img src={emailIcon} className="img-fluid" alt="btn" />
                                                </span>
                                            </div>
                                        </div>
                                        <button type="submit" name="singlebutton" className="form-submit-btn" disabled={this.state.formSubmitting ? "disabled" : ""}>Send Email</button>
                                    </form>
                                    
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

export default Forgot;