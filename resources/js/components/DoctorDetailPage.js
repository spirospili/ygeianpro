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
import SearchBar from './SearchBar';

import InviteEmailForm from './InviteEmailForm';

function DoctorDetailPage(){
    var duration;
    let formData = new FormData();
    let { id } = useParams();
    const [name, setName] = useState("")
    const [trigger, setTrigger] = useState(false)
    const [invite, setInvite] = useState(false)
    const [follows, setFollows] = useState({})
    const [followsLimit, setFollowsLimit] = useState({})
    const [masterclass, setmasterclass] = useState([])
    const [suggestedDoctors, setsuggestedDoctors] = useState([])
    const [hospital, setHospital] = useState([])
    const [society, setSociety] = useState([])
    const [speciality, setSpeciality] = useState('No Speciality')
    const [team, setteams] = useState([])
    const [metadata, setMetadata] = useState([]);
    const [searchKey, setSearchKey] = useState('')

    
    const [payment, setPayment] = useState("");
    const pStyle = {
        margin: "10px"
    };
    useEffect(() => {
        const userObj=JSON.parse(localStorage.getItem('appState'));
        console.log(userObj);
        if(userObj !=null){
        setPayment(userObj.user.payment_info)
        }
        if(id !=undefined){
            localStorage.setItem('doctorid',id)
        }
        const docId =localStorage.getItem('doctorid')
        if(userObj !=null){
            setName(userObj.user.name)
            const userTocken= userObj.user.access_token;

            axios.get("/api/auth/profile",{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }})
            .then(response => response)
            .then(response => {setSpeciality(response.data.speciality); console.log(response.data)});
           axios.get(`/api/doctors/${docId}`,{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }}).then(response=> {
                console.log(response.data);
                setFollows(response.data.doctor);
                setsuggestedDoctors(response.data.suggestedDoctors);
                axios.get(`/api/hospitals/${response.data.doctor.hospital_id}`)
                .then(response=> {
                   setHospital(response.data);
                });
                axios.get(`/api/society/${response.data.doctor.society_id}`)
                .then(response=> {
                   setSociety(response.data);
                });
            })
            setTrigger(false)
            axios.get(`/api/doctors/${docId}?limit=true`,{
                headers: {
                    'Accept' : 'application/json',
                    'Authorization': `Bearer ${userTocken}`,
                }}).then(response=> {
                    console.log(response.data);
                setFollowsLimit(response.data.doctor);
                var count=0;
                    response.data.doctor.curators.map((data, index) =>{
                        if(count<3){
                        axios.get(`/api/masterclasses/${data.masterclass_id}?limit=true`)
                          .then(response=> { 
                        console.log(response);
                        setmasterclass(Array => [...Array, response.data])
                    
                        
                    }
                      );}count++;})
                      count=0
                      response.data.doctor.team__doctors.map((data, index) =>{
                        if(count<3){
                        axios.get(`/api/teams/${data.team_id}`)
                          .then(response=> { 
                       
                        setteams(Array => [...Array, response.data])
                        console.log(response.data);

                         }
                      );}count++;})         
            })

        } else {
            axios.get(`/api/doctors/${docId}`)
            .then(response=> {
                console.log(response.data);
                setFollows(response.data.doctor)
                setsuggestedDoctors(response.data.suggestedDoctors);
                axios.get(`/api/hospitals/${response.data.doctor.hospital_id}`)
                .then(response=> {
                   setHospital(response.data);
                });
                axios.get(`/api/society/${response.data.doctor.society_id}`)
                .then(response=> {
                   setSociety(response.data);
                });
            })

            axios.get(`/api/doctors/${docId}?limit=true`)
                .then(response=> {
                    console.log(response.data);
                    setFollowsLimit(response.data.doctor)
                    var count=0;
                    response.data.doctor.curators.map((data, index) =>{
                        if(count<3){
                        axios.get(`/api/masterclasses/${data.masterclass_id}?limit=true`)
                          .then(response=> 
                            { 
                                console.log(response);
                                setmasterclass(Array => [...Array, response.data])
                            }
                      );}count++;})
                      count=0
                      response.data.doctor.team__doctors.map((data, index) =>{
                        if(count<3){
                        axios.get(`/api/teams/${data.team_id}`)
                          .then(response=> { 
                        
                        setteams(Array => [...Array, response.data])
                        console.log(response.data);
                         }
                      );}count++;})
                })
            setTrigger(false)
        }
    },[trigger])
    const follow =()=>{
        const userObj=JSON.parse(localStorage.getItem('appState'));
        const userTocken= userObj.user.access_token;
        formData.append('doctor_id', id);
        axios.post("/api/doctors",formData,{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            },}).then(response=>{ response;setTrigger(true)} )
            
    }
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
        document.getElementById("dr-team-tab").classList.remove("active");
        document.getElementById("dr-masterclass-tab").classList.remove("active");
        document.getElementById("dr-document-tab").classList.remove("active");
        document.getElementById("pills-General-tab").classList.remove("active");
        document.getElementById("pills-Speciality-tab").classList.remove("active");
       

        document.getElementById(e.target.id).classList.add("active");
        scrollTo(0,0)
    }

    const publicationFunc = (id,selection)=>{
    	const userObj=JSON.parse(localStorage.getItem('appState'));
		const userId= userObj.user.id
		const userTocken= userObj.user.access_token
		let formData = new FormData();
		formData.append('_method', 'put');
		let checker ;
		
		if(selection =="like"){
            if(localStorage.getItem('imgLike'+id)<1){
                checker =`/api/publications/${id}?like=1`
				localStorage.setItem('imgLike'+id,"2")
				localStorage.setItem('likeintp'+id,2)
            } else {
                checker =`/api/publications/${id}?unlike=1`
				localStorage.removeItem('imgLike'+id,"2")
				localStorage.removeItem('likeintp'+id,2)
            }
        }
		if(selection =="share"){
		 checker =`/api/publications/${id}?share=1`
		 var textUrl = document.getElementById(`urlImgLInk${id}`);
		 textUrl.style.display="block"
		 textUrl.select();
		 document.execCommand("copy");
		 Swal.fire("", "copy Url Successfylly ", "success")
		 textUrl.style.display=null
		}
		axios.post(checker,formData,{
				headers: {      
						'Accept' : 'application/json',
						'Authorization': `Bearer ${userTocken}`,
				}
		}).then(response => response)
		.then(response => {updateResource();});
    }
    
    const ImageFun = (id,selection)=>{
    	const userObj=JSON.parse(localStorage.getItem('appState'));
		const userId= userObj.user.id
		const userTocken= userObj.user.access_token
		let formData = new FormData();
		formData.append('_method', 'put');
		let checker ;
		
		if(selection =="like" && localStorage.getItem('imageLike'+id)<1){
		 checker =`/api/doctors/${id}?like=1`
		 localStorage.setItem('imageLike'+id,"2")
		 localStorage.setItem('likeinti'+id,2)

		}
		else if(selection =="share"){
		 checker =`/api/doctors/${id}?share=1`
		 var textUrl = document.getElementById(`urlImageLink${id}`);
		 textUrl.style.display="block"
		 textUrl.select();
		 document.execCommand("copy");
		 Swal.fire("", "copy Url Successfylly ", "success")
		 textUrl.style.display=null
		}
		axios.post(checker,formData,{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }
		}).then(response => response)
		.then(response => {updateResource();});
	}

    const updateResource = ()=>{
    	const userObj=JSON.parse(localStorage.getItem('appState'));
        const userTocken= userObj.user.access_token
        console.log("idchecker ======>",id)
        if(id !=undefined){
            localStorage.setItem('doctorid',id)
        }
        const docId =localStorage.getItem('doctorid')
        axios.get(`/api/doctors/${docId}`,{
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
            <InviteEmailForm doctorID={id}></InviteEmailForm>
        </EmailOverlay>
            <section className="inner-page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="sidebar-block">
                            
                                <div className="profile-detail text-center">
                                    <span>
                                        <img src={`${baseurl}/storage/${follows.path}`} className="img-fluid" alt="profile" />
                                    </span>
                                    <h2>{follows.name}</h2>
                                    <h4>{follows.speciality}</h4>
                                    {follows.tags?
                                    <ul>
                                        <li><a href="#">{follows.tags}</a></li>
                                    </ul>
                                    :""}
                                </div>
                                {follows.tags==="Top" && follows.name===name ? 
                                <ul className="user-followers">
                                    <li className="text-center" onClick={()=>inviteHandler()}>        
                                        <h6>Invite Doctors</h6>
                                    </li>
                                </ul> : null}
                                <ul className="user-followers" >
                                    
                                    <li className="text-center" onClick={()=>follow()}>
                                        <h3>{follows.followers_count}</h3>
                                        <h4>Followers</h4>
                                        {follows.isFollow?
                                            <h6>Unfollow</h6>
                                            : <h6>Follow</h6>
                                        }
                                    </li>
                                </ul>
                                <ul className="sidebar-menu-list nav nav-tabs" id="nav-tab" role="tablist">
                                    {/*<li><a className="nav-item nav-link active" id="dr-feed-tab" data-toggle="tab" href="#dr-feed" role="tab" aria-controls="dr-feed" aria-selected="true">Feeds <i className="fa fa-chevron-right"></i></a></li>*/}
                                    <li><a className="nav-item nav-link active" id="dr-feed-tab" data-toggle="tab" href="#dr-feed" role="tab" aria-controls="dr-feed" aria-selected="true">Feeds <i className="fa fa-chevron-right"></i></a></li>
                                    <li>
                                        <a className="nav-item nav-link" id="dr-video-tab" data-toggle="tab" href="#dr-video" role="tab" aria-controls="dr-video" aria-selected="true">
                                            Videos <i className="fa fa-chevron-right"></i>
                                        </a>
                                    </li>
                                    <li><a className="nav-item nav-link" id="dr-img-tab" data-toggle="tab" href="#dr-images" role="tab" aria-controls="dr-images" aria-selected="true">Images <i className="fa fa-chevron-right"></i></a></li>
                                    <li><a className="nav-item nav-link" id="dr-document-tab" data-toggle="tab" href="#dr-document" role="tab" aria-controls="dr-document" aria-selected="true">Document listing <i className="fa fa-chevron-right"></i></a></li>
                                    <li><a className="nav-item nav-link" id="dr-team-tab" data-toggle="tab" href="#dr-team" role="tab" aria-controls="dr-team" aria-selected="true">Team <i className="fa fa-chevron-right"></i></a></li>
                                    <li><a className="nav-item nav-link" id="dr-masterclass-tab" data-toggle="tab" href="#dr-masterclass" role="tab" aria-controls="dr-masterclass" aria-selected="true">Masterclass <i className="fa fa-chevron-right"></i></a></li>

                                    {/* <li><NavLink to="/viewallteams" className="nav-item nav-link" onClick={() => scrollTo(0,0)}>	
                                    Team <i className="fa fa-chevron-right"></i>
                                    </NavLink>	</li> */}
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="right-content-area" >
                            <form action="" className="searchbar-style mt-5 mb-5">
                                <div className="input-group">
                                    <input type="text" value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} className="form-control" placeholder="Search by keyword" />
                                    <span className="input-group-btn">
                                        <button className="btn" disabled={true}>Search</button>
                                    </span>
                                </div>
                            </form>
                            
                            <ul className="nav nav-pills mb-3" id="pills-tab"  role="tablist">
                                <li className="nav-item col" role="presentation">
                                    <button className="col nav-link active" id="pills-General-tab" onClick={tabActive} data-toggle="tab" href="#pills-General" type="button" role="tab" aria-controls="pills-General" aria-selected="true">General</button>
                                </li>
                                <li className="nav-item col" role="presentation">
                                    <button className=" col nav-link" id="pills-Speciality-tab" onClick={tabActive} data-toggle="tab" href="#pills-Speciality" type="button" role="tab" aria-controls="pills-Speciality" aria-selected="true">{speciality}</button>
                                </li>
                            </ul>
                                <div className="tab-content" id="nav-tabContent">
                                
                                   <div className="tab-pane fade show active" id="pills-General" aria-labelledby="pills-General-tab" role="tabpanel">
                                <div className="tab-pane fade show active" id="dr-feed" role="tabpanel">
                                    <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <h2 className="heading-style2">Hospital</h2>
                                                </div>
                                                <div className="col">
                                                <h2 className="heading-style2">Society</h2> 
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                {Array.isArray(hospital) && hospital.map((doctor, index) =>
                                                    <div className="col">
                                                      <div className="theme-block-style">
                                                      <div className="col-md-4">
                                                        <NavLink to={`/hospital-details/${doctor.id}`} onClick={() => scrollTo(0,0)}>	
                                                            <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />
                                                            <h5>{doctor.hospital_name}</h5> 
                                        
                                                        </NavLink>
                                                        </div>	
                                                        <h4>{doctor.description}</h4>
                                                    </div>
                                                </div>
                                                )}
                                               {Array.isArray(society) && society.map((doctor, index) =>
                                                    <div className="col">
                                                      <div className="theme-block-style">
                                                      <div className="col-md-4">
                                                        <NavLink to={`/society-details/${doctor.id}`} onClick={() => scrollTo(0,0)}>	
                                                            <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />
                                                            <h5>{doctor.society_name}</h5> 
                                        
                                                        </NavLink>
                                                        </div>	
                                                        <h4>{doctor.description}</h4>
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="profile-latest-videos">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Latest <span>Videos</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                  <a id="dr-video-tab" onClick={tabActive} data-toggle="tab" href="#dr-video" role="tab" aria-controls="dr-video" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">
                                                    View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" />
                                                </a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {Array.isArray(followsLimit.videos) && followsLimit.videos.filter(data => data.name.includes(searchKey)).map((data, index) =>
                                                    <div className="col-md-4">
                                                        <div className="theme-block-style">


                                                            {(() => {
                                                                
                                                                if (payment && data.type == 'paid') {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                                            <video width="100%" className="videoHeight"
                                                                            onLoadedMetadata={e => {
                                                                                
                                                                                duration=e.target.duration;
    
                                                                                setMetadata(
                                                                    
                                                                                  Array => [...Array, duration]
                                                                                  
                                                                                );
                                                                              }} 
                                                                               poster={`${baseurl}/storage/${data.video.jpg}`}>
                                                                                <source
                                                                                    src={`${baseurl}/storage/${data.video}`}
                                                                                    type="video/mp4"
                                                                                    />
                                                                            </video>
                                                                        </NavLink>
                                                                    )
                                                                } else if (!payment && data.type == 'paid') {
                                                                    return (
                                                                        <img
                                                                            src={`${baseurl}/storage/${data.video}.jpg`}
                                                                            style={{width: "100%"}}/>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                                            {localStorage.setItem('videourl' + data.id, data.video)}
                                                                            {localStorage.setItem('videoTitle' + data.id, data.name)}
                                                                            <video width="100%" className="videoHeight"
                                                                                   poster={`${baseurl}/storage/${data.video}.jpg`}
                                                                                   onLoadedMetadata={e => {
                                                                                    
                                                                                    const el1 = document.querySelector("#index"+index)
                                                                                    duration=e.target.duration; 
                                                                                    setMetadata(
                                                                                    
                                                                                         Array => [...Array, duration]
                                                                                    );

                                                                                   


                                                                                  }}
                                                                            >
                                                                                <source
                                                                                    src={`${baseurl}/storage/${data.video}`}
                                                                                    type="video/mp4"/>
                                                                            </video>
                                    
                                                                        </NavLink>
                                                                    )
                                                                }
                                                            })()}
                                                           
                                                            
                                                            
                                                            <h4>{data.name}</h4>
                                                            <p style={pStyle}> {data.description.length > 50 ? data.description.substring(0, 50) : data.description} {data.description.length > 50 ? "..." : ""}</p>
                                                            {metadata.length===followsLimit.videos.length? (
                                                            
                                                            
                                                                <p style={pStyle}>
                                                                    <b>Duration:</b> {(parseInt(metadata[index]/60)) +" min"} 
                                                                </p>
                                                            
                                                            ):""}
                                                            <p style={pStyle}> <b>Published date:</b> {data.created_at.split("T")[0]}</p>
                                                            <p className="doctor-subscribe">{!payment && data.type == 'paid' ? 'Subscribe to watch video' : ''}</p>
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
                                        </div>
                                        {suggestedDoctors.length>0?
                                        <div className="medical-block" >
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2"><span>Suggested Doctors</span></h2>
                                                </div>
                                                
                                            </div>
                                            <div className="row mb-5">
                                                {Array.isArray(suggestedDoctors) && suggestedDoctors.map((doctor, index) =>
                                                    <div className="col-md-4">
                                                    <a href={`/doctor-details/${doctor.id}`} >	
                                                    
                                                        <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />
                                                        <h5>{doctor.name}</h5> 
                                                        {doctor.speciality}	
                                                    </a>
                                                    <p>{doctor.description}</p>
                                                </div>
                                                )}

                                            </div>
                                        </div>:""}

                                        <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Doctor <span>Images</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                   <a  id="dr-img-tab" onClick={tabActive} data-toggle="tab" href="#dr-img" role="tab" aria-controls="dr-img" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></a>
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                                {Array.isArray(followsLimit.images) && followsLimit.images.filter(data => data.name.includes(searchKey)).map((data, index) =>
                                                    <div className="col-md-4">
                                                        <div className="medical-list theme-block-style">
                                                            <NavLink to="#" data-toggle="modal"
                                                                     data-target={'#imageModal-' + data.id}>
                                                                <img src={`${baseurl}/storage/${data.image}`}
                                                                     className="img-fluid" alt="doctor"/>
                                                            </NavLink>
                                                            <h4>{data.name}</h4>
                                                            <p style={pStyle}> {data.description.length > 50 ? data.description.substring(0, 50) : data.description} {data.description.length > 50 ? "..." : ""}</p>
                                                            <ul className="block-style">
                                                                <li onClick={() => ImageFun(data.id, "like")}>
                                                                    {localStorage.getItem('likeinti' + data.id) < 2 ?
                                                                        <img src={likeIcon} className="img-fluid"
                                                                             alt="icon"/> :
                                                                        <img src={likeFIllIcon} className="img-fluid"
                                                                             alt="icon"/>
                                                                    }
                                                                    <h6>{data.likes}</h6>
                                                                </li>
                                                                <li onClick={() => ImageFun(data.id, "share")}>
                                                                    <img src={shareIcon} className="img-fluid" alt="icon"/>
                                                                    <h6>{data.shares}</h6>
                                                                    <input id={`urlImageLink${data.id}`} readOnly
                                                                           type="text" className="hideinput"
                                                                           value={baseurl + '/storage/' + data.image}/>
                                                                </li>


                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                        <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Teams</h2>
                                                </div>
                                                <div className="col-md-3">
                                                   <a  id="dr-team-tab" onClick={tabActive} data-toggle="tab" href="#dr-team" role="tab" aria-controls="dr-team" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></a>
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                                {Array.isArray(team) && team.filter(data => data[0]?.team_name.includes(searchKey)).map((data, index) =>
                                                     data[0] ?
                                                    <div className="col-md-4">
                                                    <NavLink to={`/team-details/${data[0]?.team_id}`} onClick={() => scrollTo(0,0)}>	
                                                        <img src={`${baseurl}/storage/${data[0]?.path}`} className="img-fluid" alt="doctor" />
                                                        <h5>{data[0]?.team_name}</h5> 
                                                        {data[0]?.speciality}	
                                                    </NavLink>
                                                    <p>{data[0]?.name}</p>
                                                </div>:""
                                                )}

                                            </div>
                                        </div>

                                        <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Master<span>class</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                   <a  id="dr-masterclass-tab" onClick={tabActive} data-toggle="tab" href="#dr-masterclass" role="tab" aria-controls="dr-masterclass" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></a>
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                            {Array.isArray(masterclass) && masterclass.filter(data => data.masterclass_title.includes(searchKey)).map((doctor,index) =>
                                            <div className="col-md-4">
                                                <div className="theme-block-style">
                                                    <NavLink to={`/masterclass-detail/${doctor.id}/0`}>
                                                        {/* {localStorage.setItem('videourl'+data.id,data.video)}
                                                        {localStorage.setItem('videoTitle'+data.id,data.name)} */}
                                                        <video width="100%" className="videoHeight" >
                                                            <source src={`${baseurl}/storage/${doctor?.subclasses[0]?.path}`} type="video/mp4" />
                                                        </video>								
                                                    </NavLink>	
                                                    <h4>{doctor.masterclass_title}</h4>
                                                </div>
                                            </div>
                                            )}

                                            </div>
                                        </div>

                                        <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Medical <span>Publications</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-3">
                                                    <a  id="dr-document-tab" onClick={tabActive} data-toggle="tab" href="#dr-document" role="tab" aria-controls="dr-document" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {Array.isArray(follows.publications) && follows.publications.filter(data => data.name.includes(searchKey)).map((data, index) =>
                                                    <div className="col-md-4">
                                                        <div className="theme-block-style medical-list">
                                                            <iframe src={`${baseurl}/storage/${data.path}`} width="100%"
                                                                    height="280" frameBorder="0"
                                                                    allowFullScreen></iframe>
                                                            <NavLink to="#" data-toggle="modal"
                                                                     data-target={'#publicationModal-' + data.id}>
                                                                <h4>{data.name}</h4>
                                                            </NavLink>
                                                            <ul className="block-style">
                                                                <li onClick={() => publicationFunc(data.id, "like")}>
                                                                    {localStorage.getItem('likeintp' + data.id) < 2 ?
                                                                        <img src={likeIcon} className="img-fluid"
                                                                             alt="icon"/> :
                                                                        <img src={likeFIllIcon} className="img-fluid"
                                                                             alt="icon"/>
                                                                    }
                                                                    <h6>{data.likes}</h6>
                                                                </li>
                                                                <li onClick={() => publicationFunc(data.id, "share")}>
                                                                    <img src={shareIcon} className="img-fluid"
                                                                         alt="icon"/>
                                                                    <h6>{data.shares}</h6>
                                                                    <input id={`urlImgLInk${data.id}`} readOnly
                                                                           type="text"
                                                                           value={baseurl + '/storage/' + data.path}
                                                                           className="hideinput"/>
                                                                </li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div className="tab-pane fade" id="dr-video" role="tabpanel" aria-labelledby="dr-video-tab">
                                        <div class="profile-latest-videos">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Latest <span>Videos</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                {/*<NavLink to="/ViewAllVideos" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">
                                                    View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" />
                                                </NavLink>*/}
                                                </div>
                                            </div>
                                            <div className="row">
                                            {Array.isArray(follows.videos) && follows.videos.map((data,index) =>

                                                <div className="col-md-4">
                                                    <div className="theme-block-style">

                                                        {(() => {
                                                            if (payment && data.type == 'paid') {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                                        <video width="100%" className="videoHeight"  preload="metadata"
                                                                               poster={`${baseurl}/storage/${data.video}.jpg`}
                                                                        >
                                                                            
                                                                            <source
                                                                                src={`${baseurl}/storage/${data.video}`}

                                                                                type="video/mp4" />
                                                                        </video>
                                                                        </NavLink>
                                                                    )
                                                                } else if (!payment && data.type == 'paid') {
                                                                    return (
                                                                        <img src={`${baseurl}/storage/${data.video}.jpg`} style={{width: "100%"}} />
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                                            {localStorage.setItem('videourl'+data.id,data.video)}
                                                                            {localStorage.setItem('videoTitle'+data.id,data.name)}
                                                                            <video width="100%" className="videoHeight"
                                                                                   poster={`${baseurl}/storage/${data.video}.jpg`}
                                                                                   
                                                                            >
                                                                                <source
                                                                                    src={`${baseurl}/storage/${data.video}`}
                                                                                    type="video/mp4" />
                                                                            </video>                                                            
                                                                        </NavLink>
                                                                    )
                                                                }
                                                            })()}

                                                        <h4>{data.name}</h4>
                                                        <p  style={pStyle}> {data.description.length > 50 ? data.description.substring(0,50) :  data.description} {data.description.length > 50 ? "..." : ""}</p>
							<p className="doctor-subscribe">{!payment && data.type == 'paid' ? 'Subscribe to watch video' : ''}</p>
							<ul className="block-style">
                                                            <li onClick={()=>VideoFun(data.id,"like")}>
                                                                { localStorage.getItem('likeint'+data.id)<2?
                                                                <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li onClick={()=>VideoFun(data.id,"share")} >
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlCOyLInk${data.id}`} readOnly type="text" className="hideinput" value={baseurl+'/storage/'+data.video}/>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="dr-images" role="tabpanel" aria-labelledby="dr-img-tab">
                                        <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Doctor <span>Images</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                    {/*<NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row mb-5">
                                                {Array.isArray(followsLimit.images) && followsLimit.images.map((data,index) =>
                                                <div className="col-md-4">
                                                    <div className="medical-list theme-block-style">
                                                        <NavLink to="#" data-toggle="modal"  data-target={'#imageModal-'+data.id}>
                                                            <img src={`${baseurl}/storage/${data.image}`} className="img-fluid" alt="doctor" />										
                                                        </NavLink>
                                                        <h4>{data.name}</h4>
                                                        <p  style={pStyle}> {data.description.length > 50 ? data.description.substring(0,50) :  data.description} {data.description.length > 50 ? "..." : ""}</p>
                                                        <ul className="block-style">
                                                            <li onClick={()=>ImageFun(data.id,"like")}>
                                                                { localStorage.getItem('likeinti'+data.id)<2?
                                                                <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li onClick={()=>ImageFun(data.id,"share")} >
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlImageLink${data.id}`} readOnly type="text" className="hideinput" value={baseurl+'/storage/'+data.image}/>
                                                            </li>


                                                        </ul>
                                                    </div>
                                                </div>
                                                )}
                                                
                                            </div>
                                        </div>
                                        </div>

                                        <div className="tab-pane fade" id="dr-team" role="tabpanel" aria-labelledby="dr-team-tab">
                                        <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Teams</h2>
                                                </div>
                                                <div className="col-md-3">
                                                    {/*<NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row mb-5">
                                            {Array.isArray(team) && team.map((data, index) =>
                                            data[0] ?
                                                    <div className="col-md-4">
                                                    <NavLink to={`/team-details/${data[0]?.team_id}`} onClick={() => scrollTo(0,0)}>	
                                                        <img src={`${baseurl}/storage/${data[0]?.path}`} className="img-fluid" alt="doctor" />
                                                        <h5>{data[0]?.team_name}</h5> 
                                                        {data[0]?.speciality}	
                                                    </NavLink>
                                                    <p>{data[0]?.name}</p>
                                                </div>:""
                                                )}
                                                
                                            </div>
                                        </div>	

                                    </div>

                                    <div className="tab-pane fade" id="dr-masterclass" role="tabpanel" aria-labelledby="dr-masterclass-tab">
                                        <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Master<span>classes</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                    {/*<NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row mb-5">
                                            {Array.isArray(masterclass) && masterclass.map((doctor, index) =>
                                                <div className="col-md-4">
                                                  <div className="theme-block-style">
                                                      <NavLink to={`/masterclass-detail/${doctor.id}/0`}>
                                                          {/* {localStorage.setItem('videourl'+data.id,data.video)}
                                                          {localStorage.setItem('videoTitle'+data.id,data.name)} */}
                                                          <video width="100%" className="videoHeight" >
                                                              <source src={`${baseurl}/storage/${doctor?.subclasses[0]?.path}`} type="video/mp4" />
                                                          </video>								
                                                      </NavLink>	
                                                      <h4>{doctor.masterclass_title}</h4>
                                                  </div>
                                              </div>
                                                )}
                                                
                                            </div>
                                        </div>


                                    </div>

                                    <div className="tab-pane fade" id="dr-document" role="tabpanel" aria-labelledby="dr-document-tab">
                                        <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Medical <span>Publications</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                {/*<NavLink to="/ViewAllPublications" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row">
                                                {Array.isArray(follows.publications) && follows.publications.map((data,index) =>
                                                <div className="col-md-4">
                                                    <div className="theme-block-style medical-list">
                                                    <iframe src={`${baseurl}/storage/${data.path}`} width="100%" height="280" frameborder="0" allowfullscreen></iframe>
                                                        <NavLink to="#" data-toggle="modal"  data-target={'#publicationModal-'+data.id}>
                                                            <h4>{data.name}</h4>
                                                        </NavLink>
                                                        <ul className="block-style">
                                                            <li onClick={()=>publicationFunc(data.id,"like")}>
                                                                { localStorage.getItem('likeintp'+data.id)<2?
                                                                    <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                    <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                    }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li onClick={()=>publicationFunc(data.id,"share")}>
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlImgLInk${data.id}`} readOnly type="text" value={baseurl+'/storage/'+data.path} className="hideinput"/>
                                                            </li>
                                                        </ul>
                                                        
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                        </div>		
                                     </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-Speciality" aria-labelledby="pills-Speciality-tab" role="tabpanel">
                                    <div className="tab-pane fade show active" id="dr-feed" role="tabpanel">
                                    <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <h2 className="heading-style2">Hospital</h2>
                                                </div>
                                                <div className="col">
                                                <h2 className="heading-style2">Society</h2> 
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                {Array.isArray(hospital) && hospital.map((doctor, index) =>
                                                    <div className="col">
                                                      <div className="theme-block-style">
                                                      <div className="col-md-4">
                                                        <NavLink to={`/hospital-details/${doctor.id}`} onClick={() => scrollTo(0,0)}>	
                                                            <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />
                                                            <h5>{doctor.hospital_name}</h5> 
                                        
                                                        </NavLink>
                                                        </div>	
                                                        <h4>{doctor.description}</h4>
                                                    </div>
                                                </div>
                                                )}
                                               {Array.isArray(society) && society.map((doctor, index) =>
                                                    <div className="col">
                                                      <div className="theme-block-style">
                                                      <div className="col-md-4">
                                                        <NavLink to={`/society-details/${doctor.id}`} onClick={() => scrollTo(0,0)}>	
                                                            <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />
                                                            <h5>{doctor.society_name}</h5> 
                                        
                                                        </NavLink>
                                                        </div>	
                                                        <h4>{doctor.description}</h4>
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="profile-latest-videos">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Latest <span>Videos</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                  <a id="dr-video-tab" onClick={tabActive} data-toggle="tab" href="#dr-video" role="tab" aria-controls="dr-video" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">
                                                    View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" />
                                                </a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {Array.isArray(followsLimit.videos) && followsLimit.videos.filter(data => data.name.includes(searchKey)).map((data, index) =>
                                                    <div className="col-md-4">
                                                        <div className="theme-block-style">


                                                            {(() => {
                                                                
                                                                if (payment && data.type == 'paid') {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                                            <video width="100%" className="videoHeight"
                                                                            onLoadedMetadata={e => {
                                                                                
                                                                                duration=e.target.duration;
    
                                                                                setMetadata(
                                                                    
                                                                                  Array => [...Array, duration]
                                                                                  
                                                                                );
                                                                              }} 
                                                                               poster={`${baseurl}/storage/${data.video.jpg}`}>
                                                                                <source
                                                                                    src={`${baseurl}/storage/${data.video}`}
                                                                                    type="video/mp4"
                                                                                    />
                                                                            </video>
                                                                        </NavLink>
                                                                    )
                                                                } else if (!payment && data.type == 'paid') {
                                                                    return (
                                                                        <img
                                                                            src={`${baseurl}/storage/${data.video}.jpg`}
                                                                            style={{width: "100%"}}/>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                                            {localStorage.setItem('videourl' + data.id, data.video)}
                                                                            {localStorage.setItem('videoTitle' + data.id, data.name)}
                                                                            <video width="100%" className="videoHeight"
                                                                                   poster={`${baseurl}/storage/${data.video}.jpg`}
                                                                                   onLoadedMetadata={e => {
                                                                                    
                                                                                    const el1 = document.querySelector("#index"+index)
                                                                                    duration=e.target.duration; 
                                                                                    setMetadata(
                                                                                    
                                                                                         Array => [...Array, duration]
                                                                                    );

                                                                                   


                                                                                  }}
                                                                            >
                                                                                <source
                                                                                    src={`${baseurl}/storage/${data.video}`}
                                                                                    type="video/mp4"/>
                                                                            </video>
                                    
                                                                        </NavLink>
                                                                    )
                                                                }
                                                            })()}
                                                           
                                                            
                                                            
                                                            <h4>{data.name}</h4>
                                                            <p style={pStyle}> {data.description.length > 50 ? data.description.substring(0, 50) : data.description} {data.description.length > 50 ? "..." : ""}</p>
                                                            {metadata.length===followsLimit.videos.length? (
                                                            
                                                            
                                                                <p style={pStyle}>
                                                                    <b>Duration:</b> {(parseInt(metadata[index]/60)) +" min"} 
                                                                </p>
                                                            
                                                            ):""}
                                                            <p style={pStyle}> <b>Published date:</b> {data.created_at.split("T")[0]}</p>
                                                            <p className="doctor-subscribe">{!payment && data.type == 'paid' ? 'Subscribe to watch video' : ''}</p>
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
                                        </div>
                                        {suggestedDoctors.length>0?
                                        <div className="medical-block" >
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2"><span>Suggested Doctors</span></h2>
                                                </div>
                                                
                                            </div>
                                            <div className="row mb-5">
                                                {Array.isArray(suggestedDoctors) && suggestedDoctors.map((doctor, index) =>
                                                    <div className="col-md-4">
                                                    <a href={`/doctor-details/${doctor.id}`} >	
                                                    
                                                        <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />
                                                        <h5>{doctor.name}</h5> 
                                                        {doctor.speciality}	
                                                    </a>
                                                    <p>{doctor.description}</p>
                                                </div>
                                                )}

                                            </div>
                                        </div>:""}

                                        <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Doctor <span>Images</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                   <a  id="dr-img-tab" onClick={tabActive} data-toggle="tab" href="#dr-img" role="tab" aria-controls="dr-img" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></a>
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                                {Array.isArray(followsLimit.images) && followsLimit.images.filter(data => data.name.includes(searchKey)).map((data, index) =>
                                                    <div className="col-md-4">
                                                        <div className="medical-list theme-block-style">
                                                            <NavLink to="#" data-toggle="modal"
                                                                     data-target={'#imageModal-' + data.id}>
                                                                <img src={`${baseurl}/storage/${data.image}`}
                                                                     className="img-fluid" alt="doctor"/>
                                                            </NavLink>
                                                            <h4>{data.name}</h4>
                                                            <p style={pStyle}> {data.description.length > 50 ? data.description.substring(0, 50) : data.description} {data.description.length > 50 ? "..." : ""}</p>
                                                            <ul className="block-style">
                                                                <li onClick={() => ImageFun(data.id, "like")}>
                                                                    {localStorage.getItem('likeinti' + data.id) < 2 ?
                                                                        <img src={likeIcon} className="img-fluid"
                                                                             alt="icon"/> :
                                                                        <img src={likeFIllIcon} className="img-fluid"
                                                                             alt="icon"/>
                                                                    }
                                                                    <h6>{data.likes}</h6>
                                                                </li>
                                                                <li onClick={() => ImageFun(data.id, "share")}>
                                                                    <img src={shareIcon} className="img-fluid" alt="icon"/>
                                                                    <h6>{data.shares}</h6>
                                                                    <input id={`urlImageLink${data.id}`} readOnly
                                                                           type="text" className="hideinput"
                                                                           value={baseurl + '/storage/' + data.image}/>
                                                                </li>


                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                        <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Teams</h2>
                                                </div>
                                                <div className="col-md-3">
                                                   <a  id="dr-team-tab" onClick={tabActive} data-toggle="tab" href="#dr-team" role="tab" aria-controls="dr-team" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></a>
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                                {Array.isArray(team) && team.filter(data => data[0]?.team_name.includes(searchKey) && data[0]?.speciality===speciality).map((data, index) =>
                                                     data[0] ?
                                                    <div className="col-md-4">
                                                    <NavLink to={`/team-details/${data[0]?.team_id}`} onClick={() => scrollTo(0,0)}>	
                                                        <img src={`${baseurl}/storage/${data[0]?.path}`} className="img-fluid" alt="doctor" />
                                                        <h5>{data[0]?.team_name}</h5> 
                                                        {data[0]?.speciality}	
                                                    </NavLink>
                                                    <p>{data[0]?.name}</p>
                                                </div>:""
                                                )}

                                            </div>
                                        </div>

                                        <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Master<span>class</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                   <a  id="dr-masterclass-tab" onClick={tabActive} data-toggle="tab" href="#dr-masterclass" role="tab" aria-controls="dr-masterclass" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></a>
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                            {Array.isArray(masterclass) && masterclass.filter(data => data.masterclass_title.includes(searchKey) && data.speciality===speciality).map((doctor,index) =>
                                            <div className="col-md-4">
                                                <div className="theme-block-style">
                                                    <NavLink to={`/masterclass-detail/${doctor.id}/0`}>
                                                        {/* {localStorage.setItem('videourl'+data.id,data.video)}
                                                        {localStorage.setItem('videoTitle'+data.id,data.name)} */}
                                                        <video width="100%" className="videoHeight" >
                                                            <source src={`${baseurl}/storage/${doctor?.subclasses[0]?.path}`} type="video/mp4" />
                                                        </video>								
                                                    </NavLink>	
                                                    <h4>{doctor.masterclass_title}</h4>
                                                </div>
                                            </div>
                                            )}

                                            </div>
                                        </div>

                                        <div className="medical-block">
                                            <div className="row mb-2">
                                                <div className="col-md-9">
                                                    <h2 className="heading-style2">Medical <span>Publications</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-3">
                                                    <a  id="dr-document-tab" onClick={tabActive} data-toggle="tab" href="#dr-document" role="tab" aria-controls="dr-document" aria-selected="true" className="hvr-icon-wobble-horizontal view-all-btn nav-item nav-link">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {Array.isArray(follows.publications) && follows.publications.filter(data => data.name.includes(searchKey)).map((data, index) =>
                                                    <div className="col-md-4">
                                                        <div className="theme-block-style medical-list">
                                                            <iframe src={`${baseurl}/storage/${data.path}`} width="100%"
                                                                    height="280" frameBorder="0"
                                                                    allowFullScreen></iframe>
                                                            <NavLink to="#" data-toggle="modal"
                                                                     data-target={'#publicationModal-' + data.id}>
                                                                <h4>{data.name}</h4>
                                                            </NavLink>
                                                            <ul className="block-style">
                                                                <li onClick={() => publicationFunc(data.id, "like")}>
                                                                    {localStorage.getItem('likeintp' + data.id) < 2 ?
                                                                        <img src={likeIcon} className="img-fluid"
                                                                             alt="icon"/> :
                                                                        <img src={likeFIllIcon} className="img-fluid"
                                                                             alt="icon"/>
                                                                    }
                                                                    <h6>{data.likes}</h6>
                                                                </li>
                                                                <li onClick={() => publicationFunc(data.id, "share")}>
                                                                    <img src={shareIcon} className="img-fluid"
                                                                         alt="icon"/>
                                                                    <h6>{data.shares}</h6>
                                                                    <input id={`urlImgLInk${data.id}`} readOnly
                                                                           type="text"
                                                                           value={baseurl + '/storage/' + data.path}
                                                                           className="hideinput"/>
                                                                </li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <div className="tab-pane fade" id="dr-video" role="tabpanel" aria-labelledby="dr-video-tab">
                                        <div class="profile-latest-videos">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Latest <span>Videos</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                {/*<NavLink to="/ViewAllVideos" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">
                                                    View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" />
                                                </NavLink>*/}
                                                </div>
                                            </div>
                                            <div className="row">
                                            {Array.isArray(follows.videos) && follows.videos.map((data,index) =>

                                                <div className="col-md-4">
                                                    <div className="theme-block-style">

                                                        {(() => {
                                                            if (payment && data.type == 'paid') {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                                        <video width="100%" className="videoHeight"  preload="metadata"
                                                                               poster={`${baseurl}/storage/${data.video}.jpg`}
                                                                        >
                                                                            
                                                                            <source
                                                                                src={`${baseurl}/storage/${data.video}`}

                                                                                type="video/mp4" />
                                                                        </video>
                                                                        </NavLink>
                                                                    )
                                                                } else if (!payment && data.type == 'paid') {
                                                                    return (
                                                                        <img src={`${baseurl}/storage/${data.video}.jpg`} style={{width: "100%"}} />
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                                            {localStorage.setItem('videourl'+data.id,data.video)}
                                                                            {localStorage.setItem('videoTitle'+data.id,data.name)}
                                                                            <video width="100%" className="videoHeight"
                                                                                   poster={`${baseurl}/storage/${data.video}.jpg`}
                                                                                   
                                                                            >
                                                                                <source
                                                                                    src={`${baseurl}/storage/${data.video}`}
                                                                                    type="video/mp4" />
                                                                            </video>                                                            
                                                                        </NavLink>
                                                                    )
                                                                }
                                                            })()}

                                                        <h4>{data.name}</h4>
                                                        <p  style={pStyle}> {data.description.length > 50 ? data.description.substring(0,50) :  data.description} {data.description.length > 50 ? "..." : ""}</p>
							<p className="doctor-subscribe">{!payment && data.type == 'paid' ? 'Subscribe to watch video' : ''}</p>
							<ul className="block-style">
                                                            <li onClick={()=>VideoFun(data.id,"like")}>
                                                                { localStorage.getItem('likeint'+data.id)<2?
                                                                <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li onClick={()=>VideoFun(data.id,"share")} >
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlCOyLInk${data.id}`} readOnly type="text" className="hideinput" value={baseurl+'/storage/'+data.video}/>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="dr-images" role="tabpanel" aria-labelledby="dr-img-tab">
                                        <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Doctor <span>Images</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                    {/*<NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row mb-5">
                                                {Array.isArray(followsLimit.images) && followsLimit.images.map((data,index) =>
                                                <div className="col-md-4">
                                                    <div className="medical-list theme-block-style">
                                                        <NavLink to="#" data-toggle="modal"  data-target={'#imageModal-'+data.id}>
                                                            <img src={`${baseurl}/storage/${data.image}`} className="img-fluid" alt="doctor" />										
                                                        </NavLink>
                                                        <h4>{data.name}</h4>
                                                        <p  style={pStyle}> {data.description.length > 50 ? data.description.substring(0,50) :  data.description} {data.description.length > 50 ? "..." : ""}</p>
                                                        <ul className="block-style">
                                                            <li onClick={()=>ImageFun(data.id,"like")}>
                                                                { localStorage.getItem('likeinti'+data.id)<2?
                                                                <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li onClick={()=>ImageFun(data.id,"share")} >
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlImageLink${data.id}`} readOnly type="text" className="hideinput" value={baseurl+'/storage/'+data.image}/>
                                                            </li>


                                                        </ul>
                                                    </div>
                                                </div>
                                                )}
                                                
                                            </div>
                                        </div>
                                        </div>

                                        <div className="tab-pane fade" id="dr-team" role="tabpanel" aria-labelledby="dr-team-tab">
                                        <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Teams</h2>
                                                </div>
                                                <div className="col-md-3">
                                                    {/*<NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row mb-5">
                                            {Array.isArray(team) && team.map((data, index) =>
                                            data[0] ?
                                                    <div className="col-md-4">
                                                    <NavLink to={`/team-details/${data[0]?.team_id}`} onClick={() => scrollTo(0,0)}>	
                                                        <img src={`${baseurl}/storage/${data[0]?.path}`} className="img-fluid" alt="doctor" />
                                                        <h5>{data[0]?.team_name}</h5> 
                                                        {data[0]?.speciality}	
                                                    </NavLink>
                                                    <p>{data[0]?.name}</p>
                                                </div>:""
                                                )}
                                                
                                            </div>
                                        </div>	

                                    </div>

                                    <div className="tab-pane fade" id="dr-masterclass" role="tabpanel" aria-labelledby="dr-masterclass-tab">
                                        <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Master<span>classes</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                    {/*<NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row mb-5">
                                            {Array.isArray(masterclass) && masterclass.map((doctor, index) =>
                                                <div className="col-md-4">
                                                  <div className="theme-block-style">
                                                      <NavLink to={`/masterclass-detail/${doctor.id}/0`}>
                                                          {/* {localStorage.setItem('videourl'+data.id,data.video)}
                                                          {localStorage.setItem('videoTitle'+data.id,data.name)} */}
                                                          <video width="100%" className="videoHeight" >
                                                              <source src={`${baseurl}/storage/${doctor?.subclasses[0]?.path}`} type="video/mp4" />
                                                          </video>								
                                                      </NavLink>	
                                                      <h4>{doctor.masterclass_title}</h4>
                                                  </div>
                                              </div>
                                                )}
                                                
                                            </div>
                                        </div>


                                    </div>

                                    <div className="tab-pane fade" id="dr-document" role="tabpanel" aria-labelledby="dr-document-tab">
                                        <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2">Medical <span>Publications</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                {/*<NavLink to="/ViewAllPublications" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row">
                                                {Array.isArray(follows.publications) && follows.publications.map((data,index) =>
                                                <div className="col-md-4">
                                                    <div className="theme-block-style medical-list">
                                                    <iframe src={`${baseurl}/storage/${data.path}`} width="100%" height="280" frameborder="0" allowfullscreen></iframe>
                                                        <NavLink to="#" data-toggle="modal"  data-target={'#publicationModal-'+data.id}>
                                                            <h4>{data.name}</h4>
                                                        </NavLink>
                                                        <ul className="block-style">
                                                            <li onClick={()=>publicationFunc(data.id,"like")}>
                                                                { localStorage.getItem('likeintp'+data.id)<2?
                                                                    <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                    <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                    }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li onClick={()=>publicationFunc(data.id,"share")}>
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlImgLInk${data.id}`} readOnly type="text" value={baseurl+'/storage/'+data.path} className="hideinput"/>
                                                            </li>
                                                        </ul>
                                                        
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                        </div>		
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>  
        {Array.isArray(follows.publications) && follows.publications.map((data,index) =>
            <div className="modal fade" id={'publicationModal-'+data.id} tabIndex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
                <div className="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
                    <div className="modal-content-full-width modal-content ">
                        <div className=" modal-header-full-width modal-header text-center">
                            <button type="button" className="close " data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <iframe src={`${baseurl}/storage/${data.path}`} width="100%" height="500" frameborder="0" allowFullScreen></iframe>	
                        </div>
                    </div>
                </div>
            </div>
        )}

        {Array.isArray(follows.images) && follows.images.map((data,index) =>
            <div className="modal fade" id={'imageModal-'+data.id} tabIndex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
                <div className="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
                    <div className="modal-content-full-width modal-content ">
                        <div className=" modal-header-full-width modal-header text-center">
                            <button type="button" className="close " data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img src={`${baseurl}/storage/${data.image}`} className="img-fluid" alt="doctor" />
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}
export default DoctorDetailPage;
