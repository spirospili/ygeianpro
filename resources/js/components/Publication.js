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
        };
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
        .then(response => this.setState({ profile : response.data }));
        
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


      render() {
        const { profile } = this.state; 
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
                                        {profile.doctors && profile.doctors.length && profile.doctors.find(doctor => doctor.publications.length) ? null : 
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