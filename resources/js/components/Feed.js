import React from 'react';

import nextBlueIcon from "../../../public/images/next-1.png";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import likeFIllIcon from "../../../public/images/like.svg";
import { NavLink } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import Sidebar from './Sidebar';
import TopSearchAndFilter from './TopSearchAndFilter';
import axios from './api'
import moment from 'moment';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            user: props.userData,
			isLoggedIn: props.userIsLoggedIn,
            speciality:"No Speciality"
        };
        this.publicationFunc =this.publicationFunc.bind(this);
        this.VideoFun =this.VideoFun.bind(this);
        this.ImageFun =this.ImageFun.bind(this);
		this.updateResource =this.updateResource.bind(this);
        this.tabActive=this.tabActive.bind(this);
    }
    componentDidMount() {
        const userObj=JSON.parse(localStorage.getItem('appState'));
        const userTocken= userObj.user.access_token
        axios.get("/api/auth/profile",{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }})
        .then(response => response)
        .then(response => this.setState({ profile : response.data, speciality:response.data.speciality }));
        
    }

    componentWillMount() {
		let state = localStorage["appState"];
	
		if (state) {
			let AppState = JSON.parse(state);
			this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
		}
	}

    updateResource(){
    	const userObj=JSON.parse(localStorage.getItem('appState'));
        const userTocken= userObj.user.access_token
        axios.get("/api/auth/profile",{
            headers: {      
                'Accept' : 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }}).then(response => response)
            .then(response => this.setState({ profile : response.data }));
	}




    VideoFun(id,selection){
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
        }).then(response => {this.updateResource();});
    }

    publicationFunc(id,selection){
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
		.then(response => {this.updateResource();});
    }
    
    ImageFun(id,selection){
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
		.then(response => {this.updateResource();});
	}
    tabActive(e) {
        console.log(e.target.id)
        
        document.getElementById("pills-General-tab").classList.remove("active");
        document.getElementById("pills-Speciality-tab").classList.remove("active");
       

        document.getElementById(e.target.id).classList.add("active");
        scrollTo(0,0)
    }

      render() {
        const { profile } = this.state;
        const { speciality } = this.state; 
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
                                    <TopSearchAndFilter  />
                                    <ul className="nav nav-pills mb-3" id="pills-tab"  role="tablist">
                                        <li className="nav-item col" role="presentation">
                                            <button className="col nav-link active" id="pills-General-tab" onClick={this.tabActive} data-toggle="tab" href="#pills-General" type="button" role="tab" aria-controls="pills-General" aria-selected="true">General</button>
                                        </li>
                                        <li className="nav-item col" role="presentation">
                                            <button className=" col nav-link" id="pills-Speciality-tab" onClick={this.tabActive} data-toggle="tab" href="#pills-Speciality" type="button" role="tab" aria-controls="pills-Speciality" aria-selected="true">{speciality}</button>
                                        </li>
                                    </ul> 
                                    {profile.doctors && profile.doctors.length?
                                        <>
                                 <div className="tab-pane fade show active" id="pills-General" aria-labelledby="pills-General-tab" role="tabpanel">
                                    <div class="profile-latest-videos">
                                        <div class="row mb-2">
                                            <div class="col-md-9">
                                                <h2 class="heading-style2">Latest <span>Videos</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                            <NavLink to="/ViewAllVideos" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">
                                                View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" />
                                            </NavLink>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <>
                                            {profile.doctors.length && profile.doctors.find(doctor => doctor.videos.length) ? null : 
                                            <h5>Doctor’s you have followed haven’t share videos.</h5>
                                            }
                                            </>
                                            {Array.isArray(profile.doctors) && profile.doctors.map((doctor,index) =>
                                            <>
                                            {Array.isArray(doctor.videos) && doctor.videos.map((data,index) =>
                                                <div class="col-md-4">
                                                    <div className="theme-block-style">
                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                            {localStorage.setItem('videourl'+data.id,data.video)}
                                                            {localStorage.setItem('videoTitle'+data.id,data.name)}
                                                            {this.state.user.payment_info && data.type == 'paid'?
                                                            <video width="100%" className="videoHeight" >
                                                                <source
																	src={`${baseurl}/storage/${data.video}`}
																	poster={`${baseurl}/storage/${data.video}.jpg`}
																	type="video/mp4" />
                                                            </video> : 
                                                            null								
                                                            }
                                                            {data.type == 'free'?
                                                            <video width="100%" className="videoHeight" >
                                                                <source
																	src={`${baseurl}/storage/${data.video}`}
																	poster={`${baseurl}/storage/${data.video}.jpg`}
																		type="video/mp4" />
                                                            </video>: 
                                                            null								
                                                            }	

                                                        </NavLink>	
                                                        <h4>{data.name} <small>{data.type == 'paid' ? 'Paid Video' : ''}</small></h4>
                                                        <ul className="block-style">
                                                            <li onClick={()=>this.VideoFun(data.id,"like")}>
                                                                { localStorage.getItem('likeint'+data.id)<2?
                                                                <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li>
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlCOyLInk${data.id}`} readOnly type="text" className="hideinput" value={baseurl+'/storage/'+data.video}/>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                            </>    
                                            )}
                                        </div>
                                        
                                    </div>


                                    <div class="medical-block">
                                        <div class="row mb-2">
                                            <div class="col-md-9">
                                                <h2 class="heading-style2">Medical <span>Publications</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                            {<NavLink to="/ViewAllPublications" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>}
                                            </div>
                                        </div>
                                        <div class="row">
                                        <>
                                        {profile.doctors.length && profile.doctors.find(doctor => doctor.publications.length) ? null : 
                                        <h5>Doctor’s you have followed haven’t share medical publications.</h5>
                                        }
                                        </>
                                        {Array.isArray(profile.doctors) && profile.doctors.map((doctor,index) =>
                                        <>
                                        {Array.isArray(doctor.publications) && doctor.publications.map((data,index) =>
                                            <div className="col-md-4">
                                                <div className="theme-block-style medical-list">
                                                    <iframe src={`${baseurl}/storage/${data.path}`} width="100%" height="280" frameborder="0" allowfullscreen></iframe>
                                                    <NavLink to="#" data-toggle="modal"  data-target={'#publicationModal-'+data.id}>
                                                        <h4>{data.name}</h4>										
                                                    </NavLink>
                                                    <ul className="block-style">
                                                            <li onClick={()=>this.publicationFunc(data.id,"like")}>
                                                                { localStorage.getItem('likeintp'+data.id)<2?
                                                                    <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                    <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                    }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li>
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlImgLInk${data.id}`} readOnly type="text" value={baseurl+'/storage/'+data.path} className="hideinput"/>
                                                            </li>
                                                        </ul>
                                                </div>
                                            </div>
                                        )}
                                        </>
                                            )}
                                        </div>
                                    </div>


                                    <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2"> <span>Images</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                    {/*<NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row">
                                            <>
                                            {profile.doctors.length && profile.doctors.find(doctor => doctor.images.length) ? null : 
                                            <h5>Doctor’s you have followed haven’t share images.</h5>
                                            }
                                            </>
                                            {Array.isArray(profile.doctors) && profile.doctors.map((doctor,index) =>
                                            <>
                                            {Array.isArray(doctor.images) && doctor.images.map((data,index) =>
                                                <div className="col-md-4">
                                                    <div className="medical-list theme-block-style">
                                                        <NavLink to="#" data-toggle="modal"  data-target={'#imageModal-'+data.id}>
                                                            <img src={`${baseurl}/storage/${data.image}`} className="img-fluid" alt="doctor" />										
                                                        </NavLink>
                                                        <h4>{data.name}</h4>
														<ul className="block-style">
                                                            <li>
                                                                { localStorage.getItem('likeinti'+data.id)<2?
                                                                <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li>
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlImageLink${data.id}`} readOnly type="text" className="hideinput" value={baseurl+'/storage/'+data.image}/>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                            </> 
                                            )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-Speciality" aria-labelledby="pills-Speciality-tab" role="tabpanel">
                                        <div class="profile-latest-videos">
                                        <div class="row mb-2">
                                            <div class="col-md-9">
                                                <h2 class="heading-style2">Latest <span>Videos</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                            <NavLink to="/ViewAllVideos" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">
                                                View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" />
                                            </NavLink>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <>
                                            {profile.doctors.length && profile.doctors.find(doctor => doctor.videos.length) ? null : 
                                            <h5>Doctor’s you have followed haven’t share videos.</h5>
                                            }
                                            </>
                                            {Array.isArray(profile.doctors) && profile.doctors.filter(data => data.speciality===speciality).map((doctor,index) =>
                                            <>
                                            {Array.isArray(doctor.videos) && doctor.videos.map((data,index) =>
                                                <div class="col-md-4">
                                                    <div className="theme-block-style">
                                                        <NavLink to={`/video-detail/${data.id}`}>
                                                            {localStorage.setItem('videourl'+data.id,data.video)}
                                                            {localStorage.setItem('videoTitle'+data.id,data.name)}
                                                            {this.state.user.payment_info && data.type == 'paid'?
                                                            <video width="100%" className="videoHeight" >
                                                                <source
																	src={`${baseurl}/storage/${data.video}`}
																	poster={`${baseurl}/storage/${data.video}.jpg`}
																	type="video/mp4" />
                                                            </video> : 
                                                            null								
                                                            }
                                                            {data.type == 'free'?
                                                            <video width="100%" className="videoHeight" >
                                                                <source
																	src={`${baseurl}/storage/${data.video}`}
																	poster={`${baseurl}/storage/${data.video}.jpg`}
																		type="video/mp4" />
                                                            </video>: 
                                                            null								
                                                            }	

                                                        </NavLink>	
                                                        <h4>{data.name} <small>{data.type == 'paid' ? 'Paid Video' : ''}</small></h4>
                                                        <ul className="block-style">
                                                            <li onClick={()=>this.VideoFun(data.id,"like")}>
                                                                { localStorage.getItem('likeint'+data.id)<2?
                                                                <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li>
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlCOyLInk${data.id}`} readOnly type="text" className="hideinput" value={baseurl+'/storage/'+data.video}/>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                            </>    
                                            )}
                                        </div>
                                        
                                    </div>


                                    <div class="medical-block">
                                        <div class="row mb-2">
                                            <div class="col-md-9">
                                                <h2 class="heading-style2">Medical <span>Publications</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                            {<NavLink to="/ViewAllPublications" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>}
                                            </div>
                                        </div>
                                        <div class="row">
                                        <>
                                        {profile.doctors.length && profile.doctors.find(doctor => doctor.publications.length) ? null : 
                                        <h5>Doctor’s you have followed haven’t share medical publications.</h5>
                                        }
                                        </>
                                        {Array.isArray(profile.doctors) && profile.doctors.map((doctor,index) =>
                                        <>
                                        {Array.isArray(doctor.publications) && doctor.publications.filter(data => data.speciality===speciality).map((data,index) =>
                                            <div className="col-md-4">
                                                <div className="theme-block-style medical-list">
                                                    <iframe src={`${baseurl}/storage/${data.path}`} width="100%" height="280" frameborder="0" allowfullscreen></iframe>
                                                    <NavLink to="#" data-toggle="modal"  data-target={'#publicationModal-'+data.id}>
                                                        <h4>{data.name}</h4>										
                                                    </NavLink>
                                                    <ul className="block-style">
                                                            <li onClick={()=>this.publicationFunc(data.id,"like")}>
                                                                { localStorage.getItem('likeintp'+data.id)<2?
                                                                    <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                    <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                    }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li>
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlImgLInk${data.id}`} readOnly type="text" value={baseurl+'/storage/'+data.path} className="hideinput"/>
                                                            </li>
                                                        </ul>
                                                </div>
                                            </div>
                                        )}
                                        </>
                                            )}
                                        </div>
                                    </div>


                                    <div class="medical-block">
                                            <div class="row mb-2">
                                                <div class="col-md-9">
                                                    <h2 class="heading-style2"> <span>Images</span></h2>
                                                </div>
                                                <div className="col-md-3">
                                                    {/*<NavLink to="#" className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>*/}
                                                </div>
                                            </div>
                                            <div class="row">
                                            <>
                                            {profile.doctors.length && profile.doctors.find(doctor => doctor.images.length) ? null : 
                                            <h5>Doctor’s you have followed haven’t share images.</h5>
                                            }
                                            </>
                                            {Array.isArray(profile.doctors) && profile.doctors.filter(data => data.speciality===speciality).map((doctor,index) =>
                                            <>
                                            {Array.isArray(doctor.images) && doctor.images.map((data,index) =>
                                                <div className="col-md-4">
                                                    <div className="medical-list theme-block-style">
                                                        <NavLink to="#" data-toggle="modal"  data-target={'#imageModal-'+data.id}>
                                                            <img src={`${baseurl}/storage/${data.image}`} className="img-fluid" alt="doctor" />										
                                                        </NavLink>
                                                        <h4>{data.name}</h4>
														<ul className="block-style">
                                                            <li>
                                                                { localStorage.getItem('likeinti'+data.id)<2?
                                                                <img src={likeIcon} className="img-fluid" alt="icon" />:
                                                                <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                                                }
                                                                <h6>{data.likes}</h6>
                                                            </li>
                                                            <li>
                                                                <img src={shareIcon} className="img-fluid" alt="icon" />
                                                                <h6>{data.shares}</h6>
                                                                <input id={`urlImageLink${data.id}`} readOnly type="text" className="hideinput" value={baseurl+'/storage/'+data.image}/>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                            </> 
                                            )}
                                            </div>
                                          </div>
                                    
                                        </div>
                                        </>
                                   : <h5>You haven’t followed anyone, please follow doctors to see the feed. </h5>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {Array.isArray(profile.doctors) && profile.doctors.map((doctor,index) =>
                    <div>
                    {Array.isArray(doctor.publications) && doctor.publications.map((publication,index) =>
						<div key={index} className="modal fade" id={'publicationModal-'+publication.id} tabindex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
							<div className="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
								<div className="modal-content-full-width modal-content ">
									<div className=" modal-header-full-width modal-header text-center">
										<button type="button" className="close " data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<iframe src={'storage/'+publication.path} width="100%" height="500" frameborder="0" allowFullScreen></iframe>	
									</div>
								</div>
							</div>
						</div>
                    )}
				</div>
				)}
			
            {Array.isArray(profile.doctors) && profile.doctors.map((doctor,index) =>
            <div>
            {Array.isArray(doctor.images) && doctor.images.map((data,index) =>
                <div className="modal fade" id={'imageModal-'+data.id} tabindex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
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
            </div>

            )}
		  </>
	    )
    }
}
export default Feed;