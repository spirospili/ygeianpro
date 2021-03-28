import React,{useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom'
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import Sidebar from './Sidebar';
import axios from './api'
import FlashMessage from "react-flash-message";

function Setting() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("") 
    const [oldPassword, setOldPassword] = useState("") 
    const [newPassword, setNewPassword] = useState("") 
    const [confirmPassword, setConfirmPassword] = useState("") 
    const [imageFile, setImage] = useState("") 
    const [errors, setErrors] = useState(null)
    const [successMessage, setsuccessMessage] = useState("")

    const [updater, setUpdater] = useState(false) 
    let history = useHistory();
    const formSubmit=()=>{
        setUpdater(true)
        console.log(imageFile);
        const userDetail={
            'name':name,
            'password':newPassword,
            'password_confirmation':confirmPassword,
            'email':email,
            'phone':phone,
            'oldPassword':oldPassword,
            'image' : imageFile
        }
        const userObj=JSON.parse(localStorage.getItem('appState'));
        const userId= userObj.user.id
        const userTocken= userObj.user.access_token
        let formData = new FormData();
        //userDetail.append('image',image);
        //formData.append('_method', 'PATCH');
        formData.append('name', name);
        formData.append('email', email);
        formData.append('oldPassword', oldPassword);
        formData.append('password', newPassword);
        formData.append('password_confirmation', confirmPassword);
        formData.append('phone', phone);
        formData.append('image', imageFile);
        formData.append('_method', 'patch');
        setErrors(null)
        setsuccessMessage("")
        const userObjUpdated={...userObj}
        axios.post(`/api/auth/profile/${userId}`,formData,{
            headers: {  
                'content-type': "multipart/form-data",    
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(data=>{
            userObjUpdated.user.name=name;
            userObjUpdated.user.email=email;
            userObjUpdated.user.phone=phone;
            userObjUpdated.user.image=data.data.image;
            localStorage.setItem("appState", JSON.stringify(userObjUpdated));
            if(userObj !=null){
                setName(userObj.user.name)
                setEmail(userObj.user.email)
                setPhone(userObj.user.phone)
            }
            setsuccessMessage("Profile has been updated successfully")
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setImage("")
            document.getElementById("profile_image").value = ""

        })
        .catch(err=>{
            setErrors(err.response.data.errors)
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setImage("")
            document.getElementById("profile_image").value = ""
        })

        
    }
    
    useEffect(() => {
        const userObj=JSON.parse(localStorage.getItem('appState'));
        if(userObj !=null){
            setName(userObj.user.name)
            setEmail(userObj.user.email)
            setPhone(userObj.user.phone)
        }
           
    }, [updater])
        return (
          <>
            <InnerPageHeader />
                <section className="inner-page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Sidebar />
                            </div>
                            <div className="col-md-9">
                                <div className="right-content-area">
                                    <h2 className="heading-style2">Setting</h2>
                                    <div className="contact-form profile-setting-form">
                                        <form className="row" onSubmit={(e)=>e.preventDefault()}> 
                                            <div className="form-group col-md-6">
                                                <label>Name</label>
                                                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" name="name" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Phone#</label>
                                                <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" name="phone" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Email</label>
                                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" name="email" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Old Password</label>
                                                <input type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} className="form-control" name="o_pass" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>New Password</label>
                                                <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="form-control" name="n_pass" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Confirm Password</label>
                                                <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="form-control" name="c_pass" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Profile Picture</label>
                                                <input type="file"  id="profile_image" className="form-control" name="image" onChange={(e)=>setImage(e.target.files[0])}/>
                                            </div>
                                            <div className="col-md-3">
                                                <button type="submit" onClick={formSubmit} className="contact-submit mt-3">Update</button>
                                            </div>

                                            {successMessage ?
                                                <FlashMessage duration={10000} persistOnHover={true}>
                                                     <h5 className={"alert alert-success"}> {successMessage}</h5>
                                                </FlashMessage>
                                            : ""
                                            }

                                            {
                                                errors ?
                                                    <FlashMessage duration={10000} persistOnHover={true}>
                                                        { Object.keys(errors).map(function(key,index){
                                                        return <h5 className={"alert alert-danger"} key={index}> {errors[key]}</h5>
                                                     })}
                                                    </FlashMessage>
                                                : ''
                                            }

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            
		  </>
	    )
    }

export default Setting;