import React,{useEffect,useState} from 'react';
import InnerPageHeader from './InnerPageHeader';
import nextBlueIcon from "../../../public/images/next-1.png";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import topDoctor1 from "../../../public/images/Group1238.png";
import topDoctor2 from "../../../public/images/Group1239.png";
import doctorList1 from "../../../public/images/Group1238.png";
import doctorList2 from "../../../public/images/Group1239.png";
import MedicalPublication from "../../../public/images/doc.jpg";
import likeFIllIcon from "../../../public/images/like.svg";
import shareFillIcon from "../../../public/images/share.svg";
import VideoImgModal from "../../../public/images/doc.jpg";
import teammember from "../../../public/images/teamnew.png";
import memberlogo from "../../../public/images/teamlogo.png";
import userProfileImg from "../../../public/images/sidebar-profile.png";
import videoPoster from "../../../public/images/video-poster.jpg";
import Footer from './Footer';
import ViewAllVideos from './ViewAllVideos';
import ViewAllDoctors from './ViewAllDoctors';
import ViewAllPublications from './ViewAllPublications';
import { NavLink,useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from './api';
import EmailOverlay from './EmailOverlay';
import InviteEmailForm from './InviteEmailForm';

function TeamDetails(){
    let formData = new FormData();
    let { id } = useParams();
    const [name, setName] = useState("");
    const [invite, setInvite] = useState(false);
    const [payment, setPayment] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [follows, setFollows] = useState([]);
    const [followsLimit, setFollowsLimit] = useState([]);

    const pStyle = {
        margin: "10px"
    };
    useEffect(() => {
        const userObj=JSON.parse(localStorage.getItem('appState'));
        
        if(id !=undefined){
            localStorage.setItem('teamid',id)
        }
        const teamId =localStorage.getItem('teamid');
        
        if(userObj !=null){
            setName(userObj.user.name);

            const userTocken= userObj.user.access_token

           axios.get(`/api/teams/${teamId}`,).then(response=> {

                setFollows(response.data)
                response.data.map(doc => {
            
                    axios.get(`/api/doctors/${doc.doctor_id}?limit=true`,).then(response=> {
                            console.log(response.data);  
                        setFollowsLimit(Array => [...Array, response.data])});
                   }); 
            
            });
                console.log(follows);

            setTrigger(false)
            
        } else {
            axios.get(`/api/teams/${teamId}`)
            .then(response=> {
               
                setFollows(response.data)
                response.data.map(doc => {
                  
                    axios.get(`/api/doctors/${doc.doctor_id}?limit=true`,).then(response=> {
                          console.log(response.data);  
                        setFollowsLimit(Array => [...Array, response.data])});
                   });
            });
                console.log(follows);
                
            setTrigger(false)
        }
    },[trigger]);
    console.log(followsLimit);
    const inviteHandler=()=>{
        setInvite(true);
    }
    const inviteCancelHandler=()=>{
        setInvite(false);
    }

    const VideoFun = (id,selection)=>{
		const userObj=JSON.parse(localStorage.getItem('appState'));
		const userId= userObj.user.id
		const userTocken= userObj.user.access_token
		let formData = new FormData();
		formData.append('_method', 'put');
		let checker ;
		if(selection =="like"){
            if(localStorage.getItem('videoLike'+id)<1){
                checker =`/api/videos/${id}?like=1`
                localStorage.setItem('videoLike'+id,"2")
                localStorage.setItem('likeint'+id,"2")
            } else {
                checker =`/api/videos/${id}?unlike=1`
                localStorage.removeItem('videoLike'+id,"2")
                localStorage.removeItem('likeint'+id,"2")
            }
        }
        

		if(selection =="share"){
		 checker =`/api/videos/${id}?share=1`;
		 var textUrl = document.getElementById(`urlCOyLInk${id}`);
		 textUrl.style.display="block"
		 textUrl.select();
		 
		 textUrl.setSelectionRange(0, 99999)
		 document.execCommand("copy");
		 // alert("Copied the text: " + textUrl.value);
		 Swal.fire("", "copy Url Successfylly ", "success")
		 textUrl.style.display=null
		}
		axios.post(checker,formData,{
				headers: {      
						'Accept' : 'application/json',
						'Authorization': `Bearer ${userTocken}`,
				}
        }).then(response => {updateResource();});
    }


    const tabActive = (e) => {
        console.log(e.target.id)
        document.getElementById("dr-feed-tab").classList.remove("active");
        document.getElementById("dr-video-tab").classList.remove("active");
        document.getElementById("dr-img-tab").classList.remove("active");
        document.getElementById("dr-document-tab").classList.remove("active");
        document.getElementById(e.target.id).classList.add("active");
        scrollTo(0,0)
    }

   
    const updateResource = ()=>{
    	const userObj=JSON.parse(localStorage.getItem('appState'));
        const userTocken= userObj.user.access_token
        console.log("idchecker ======>",id)
        if(id !=undefined){
            localStorage.setItem('doctorid',id)
        }
        const docId =localStorage.getItem('doctorid')
        axios.get(`/api/teams/${teamId}`,{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }}).then(response=> {
                setFollows(response.data)})
            setTrigger(false)
	
	}

    
    return (
        <>
        <InnerPageHeader />
        <EmailOverlay show={invite} EmailOverlayClosed={inviteCancelHandler}>
            <InviteEmailForm doctorID={follows[0]?.id}></InviteEmailForm>
        </EmailOverlay>
        
            <section className="inner-page-content doctor-team-page">
                <div className="container-margin container-fluid" >
                    <div className="row no-gutters"style={{ width: '100%'}}>
                        <div className="col">
                            <div className="right-content-area">
                                <div className="row align-items-center mb-4 single-doctor">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-3 lead-img team-detail">
                                        <span>                                        
                                            <img src={`${baseurl}/storage/${follows[0]?.path}`} className="img-fluid" alt="doctor" />
                                        </span>

                                    </div>
                                    <div className="col-md-5">
                                    <NavLink to={`/doctor-details/${follows[0]?.id}`} onClick={() => scrollTo(0,0)}>	<h2 className="heading-style3" >{follows[0]?.name}</h2></NavLink>
                                      <h5>{follows[0]?.speciality} | Head Doctor</h5>
                                        <p>{follows[0]?.description}</p>
                                        <img src={memberlogo} className="img-fluid " alt="doctor" />
                                        <ul className="user-followers" style={{width:"25%"}}>
                                            <li className="text-center" onClick={()=>inviteHandler()}>        
                                                <h6>Invite Doctors</h6>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <hr
                                    style={{
                                        color: "#E8E8E8",
                                        backgroundColor: "#E8E8E8",
                                        height: 5
                                    }}
                                />
                                <div className="profile-latest-videos">
                                
                                    <div className="row mb-2">
                                        
                                        <div className="col" style={{paddingLeft:'54%'}}>
                                            <h2 className="view-all-btn" style={{textAlign:"left"}}>Recent Videos</h2>
                                        </div>
                                        <div className="col">
                                            <NavLink to="/view-all-doctors" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>
                                        </div>
                                    </div>
                                    {Array.isArray(followsLimit) && followsLimit.map((data, index) => 
                                     <div className="row  single-doctor" style={{paddingLeft:'10%'}}>
                                        <div className="col-md-6 row">  
                                            <div className="col lead-img team-detail">
                                                <span>
                                                <img src={`${baseurl}/storage/${data?.path}`} className="img-fluid" alt="doctor" />
                                                </span>
                                            </div>
                                            <div className="col team-member">
                                                
                                            <NavLink to={`/doctor-details/${data?.id}`} onClick={() => scrollTo(0,0)}>  <h2 className="row heading-style3">{data?.name}</h2></NavLink>
                                                <h5 className="row">{data?.speciality}</h5>
                                                <p className="row">{data?.description}</p>
                                            </div>
                                        </div>
                                                {Array.isArray(data.videos) && data.videos.map((videodata, index) =>
                                                    <div className="col-md-3">
                                                        <div className="theme-block-style">


                                                            {(() => {
                                                                if (payment && videodata.type == 'paid') {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                                            <video width="100%" className="videoHeight"    poster={`${baseurl}/storage/${videodata.video.jpg}`}>
                                                                                <source
                                                                                    src={`${baseurl}/storage/${videodata.video}`}
                                                                                    type="video/mp4"/>
                                                                            </video>
                                                                        </NavLink>
                                                                    )
                                                                } else if (!payment && videodata.type == 'paid') {
                                                                    return (
                                                                        <img
                                                                            src={`${baseurl}/storage/${videodata.video}.jpg`}
                                                                            style={{width: "100%"}}/>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${videodata.id}`}>
                                                                            {localStorage.setItem('videourl' + videodata.id, data.video)}
                                                                            {localStorage.setItem('videoTitle' + videodata.id, data.name)}
                                                                            <video width="100%" className="videoHeight"
                                                                                   poster={`${baseurl}/storage/${videodata.video}.jpg`}
                                                                            >
                                                                                <source
                                                                                    src={`${baseurl}/storage/${videodata.video}`}
                                                                                    type="video/mp4"/>
                                                                            </video>
                                                                        </NavLink>
                                                                    )
                                                                }
                                                            })()}

                                                            <h4>{videodata.name}</h4>
                                                            <p style={pStyle}> {videodata.description.length > 50 ? videodata.description.substring(0, 50) : videodata.description} {videodata.description.length > 50 ? "..." : ""}</p>
                                                            <p className="doctor-subscribe">{!payment && videodata.type == 'paid' ? 'Subscribe to watch video' : ''}</p>
                                                            <ul className="block-style">
                                                                <li onClick={() => VideoFun(data.id, "like")}>
                                                                    {localStorage.getItem('likeint' + data.id) < 2 ?
                                                                        <img src={likeIcon} className="img-fluid"
                                                                             alt="icon"/> :
                                                                        <img src={likeFIllIcon} className="img-fluid"
                                                                             alt="icon"/>
                                                                    }
                                                                    <h6>{data.likes}</h6>
                                                                </li>
                                                                <li onClick={() => VideoFun(data.id, "share")}>
                                                                    <img src={shareIcon} className="img-fluid"
                                                                         alt="icon"/>
                                                                    <h6>{data.shares}</h6>
                                                                    <input id={`urlCOyLInk${data.id}`} readOnly
                                                                           type="text" className="hideinput"
                                                                           value={baseurl + '/storage/' + data.video}/>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>  
                                    
                                    )}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>  
        </>
    )
}
export default TeamDetails;
