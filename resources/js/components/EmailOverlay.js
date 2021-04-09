import React from 'react';
import classes from  '../../../public/css/emailOverlay.css';
import Backdrop from './Backdrop';
const EmailOverlay = (props)=>(
    <div>
        <Backdrop show={props.show} clicked={props.EmailOverlayClosed}/>    
    <div 
    className="emailOverlay"
    style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1': '0'
    }}>
        {props.children}
    </div>
    </div>

);

export default EmailOverlay; 
