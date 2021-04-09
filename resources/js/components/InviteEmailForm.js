import React , {useState} from 'react';
import FlashMessage from "react-flash-message";
import { NavLink } from 'react-router-dom';
import newsletterIcon from "../../../public/images/send.png";


const InviteEmailForm =(props) =>{
    const [email, setEmail] = useState("")
    const [successMessage, setsuccessMessage] = useState("")
    
    const formSubmit=()=>{


        let formData = new FormData();
        formData.append('email', email);
        formData.append('doctorID', props.doctorID);
        setsuccessMessage(null)
        axios.post(`/api/invite`,formData,{
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(data=>{
                setsuccessMessage(data.data.message);
                setEmail("")
            })
            .catch(err=>{
                console.log(err);
            })


    }
return(
              <div>
                <div className="invite-doctor">
                    <div className="row ">
                        <div className="row">
                            
                            <p>Please add Doctor's email you want to invite.</p>
                            <p>For more than one, use comma between them.</p>
                        </div>
                        <div  style={{width:"100%"}}>
                            <form action="" className="subscribe-email" onSubmit={(e)=>e.preventDefault()}>
                                <div className="input-group" >
                                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email" required />
                                </div>
                                <ul className="user-followers invite-button" >
                                            <li className="text-center" type="submit" onClick={formSubmit}>
                                                <h6>Invite Doctors</h6>
                                            </li>
                                </ul>
                                {successMessage ?
                                    <>
                                    <br />
                                    <FlashMessage duration={10000} persistOnHover={true}>
                                        <h5 className={"alert alert-success"}> {successMessage}</h5>
                                    </FlashMessage>
                                    </>
                                    : ""
                                }
                            </form>
                        </div>
                    </div>
                </div>
                </div>
);

};

export default InviteEmailForm;