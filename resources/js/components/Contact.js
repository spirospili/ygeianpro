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
import InnerPageHeader from './InnerPageHeader';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isRegistered: false,
          error: '',
          errorMessage: '',
          formSubmitting: false,
          contact: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        redirect: props.redirect,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    }
    // 2.2
    // componentWillMount, componentDidMount etc etc that have //componentStuffStuff are known as React Lifecycles which of course //you already know 
    componentWillMount() {
      let state = localStorage["appState"];
      if (state) {
        let AppState = JSON.parse(state);
        this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
      }
      
    }
    // 2.3
    componentDidMount() {
      
    }
    // 2.4
    handleSubmit(e) {
      e.preventDefault();
      this.setState({formSubmitting: true});
      //ReactDOM.findDOMNode(this).scrollIntoView();
      let contactData = this.state.contact;
      axios.post("/api/contact", contactData)
        .then(response => {
          return response;
      }).then(json => {
          if (json.data.success) {
            alert('Thank you for contacting')
            location.href = '/';
          } else {
              alert(`Our System Failed To Register Your Account!`);
          }
     }).catch(error => {if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          let err = error.response.data;
          this.setState({
            error: err.message,
            errorMessage: [],
            formSubmitting: false
          })
        }
        else if (error.request) {
          // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
          let err = error.request;
          console.log(err, 'now here');
          this.setState({
            error: err,
            formSubmitting: false
          })
       } else {
           // Something happened in setting up the request that triggered an Error
           let err = error.message;
           console.log(err, 'ok fine');
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
        contact: {
          ...prevState.contact, name: value
        }
      }));
    }
    // 2.5
    handleEmail(e) {
      let value = e.target.value;
      this.setState(prevState => ({
        contact: {
          ...prevState.contact, email: value
        }
      }));
    }
    handleSubject(e) {
        let value = e.target.value;
        this.setState(prevState => ({
          contact: {
            ...prevState.contact, subject: value
            }
        }));
    }
    handleMessage(e) {
      let value = e.target.value;
      this.setState(prevState => ({
        contact: {
          ...prevState.contact, message: value
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
              <InnerPageHeader />
              <div className="subheader">
                <h1 className="heading-style1">Contact Us</h1>
              </div>
              <section className="content-section about-page-content">
                <div className="container">
                    <div className="row">  
                        <div className="col-md-8 p-0 offset-md-2">
                            <div className="signup-block pt-0">
                                <h1 className="heading-style2">Send Message</h1>
                                
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
                                          <input name="email" className="form-control" placeholder="johndoe@gmail.com" type="email" onChange={this.handleEmail} required />
                                          <div className="input-group-prepend">
                                              <span className="input-group-text">
                                                  <img src={emailIcon} className="img-fluid" alt="btn" />
                                              </span>
                                          </div>
                                      </div>
                                      <div className="form-group input-group">
                                          <label>Subject</label>
                                          <input name="subject" className="form-control" type="text" onChange={this.handleSubject} required/>
                                      </div>
                                      <div className="form-group input-group">
                                          <label>Message</label>
                                          <textarea name="message" className="form-control" onChange={this.handleMessage} required></textarea>
                                      </div>
                                      
                                      {/*<div className="form-group input-group">
                                          <input name="" className="form-control" type="text" />
                                          <img src={reCapcha} className="recaptcha-img img-fluid" alt="recapcha" />
                                      </div>*/}
                                      <button type="submit" name="singlebutton" className="form-submit-btn" disabled={this.state.formSubmitting ? "disabled" : ""}>Submit</button>
                                  </form>
                            </div>
                        </div>
                        <div className="col-md-3 p-0">
                            
                        </div>
                    </div>
                </div>
              </section>
            </>
        )
    }
}

export default Contact;