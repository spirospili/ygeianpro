import React,{useState,useEffect} from 'react';
import nextBlueIcon from "../../../public/images/next-1.png";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import VideoImgModal from "../../../public/images/doc.jpg";
import MedicalPublication from "../../../public/images/doc.jpg";
import videoPoster from "../../../public/images/video-poster.jpg";
import { NavLink,useParams } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';
import Footer from './Footer';
import Sidebar from './Sidebar';
import TopSearchAndFilter from './TopSearchAndFilter';
import axios from './api' 

function SearchData(){
    let { id } = useParams();
    const [newsDetail, setNewsDetail] = useState({})
    useEffect(() => {
     axios.get(`/api/search?search=${id}`)
     .then((response) => {setNewsDetail(response.data);console.log(response)})
     .then((data) => console.log('This is your data', data));
    },[id,])
        return (
          <>
          {console.log("usman",newsDetail)}
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
                                        {Array.isArray(newsDetail.videos) && newsDetail.videos.map((data,index) =>
                                        <div class="col-md-4">
                                                <div className="theme-block-style">
                                                    <NavLink to={`/video-detail/${data.id}`}>
                                                        {localStorage.setItem('videourl'+data.id,data.video)}
                                                        {localStorage.setItem('videoTitle'+data.id,data.name)}
                                                        <video width="100%" className="videoHeight" >
                                                            <source src={`${baseurl}/storage/${data.video}`} type="video/mp4" />
                                                        </video>								
                                                    </NavLink>	
                                                    <h4>{data.name}</h4>
                                                    <ul className="block-style">
                                                        <li>
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
                                        {Array.isArray(newsDetail.publications) && newsDetail.publications.map((data,index) =>
                                            <div className="col-md-4">
                                                <div className="theme-block-style medical-list">
                                                    <iframe src={`${baseurl}/storage/${data.path}`} width="100%" height="280" frameborder="0" allowfullscreen></iframe>
                                                    <NavLink to="#" data-toggle="modal"  data-target={'#publicationModal-'+data.id}>
                                                        <h4>{data.name}</h4>										
                                                    </NavLink>
                                                    <ul className="block-style">
                                                        <li>
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
                                        </div>
                                    </div>

                                    <div class="medical-block">
                                        <div class="row mb-2">
                                            <div class="col-md-9">
                                                <h2 class="heading-style2">Top <span>Doctors</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                            {<NavLink to="/ViewAllDoctors" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>}
                                            </div>
                                        </div>
                                        <div class="row">
                                        {Array.isArray(newsDetail.doctors) && newsDetail.doctors.map((doctor,index) =>
                                            <div className="col-md-4">
                                                <NavLink to={`/doctor-details/${doctor.id}`} onClick={() => scrollTo(0,0)}>	
                                                    <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />
                                                    <h5>{doctor.name}</h5> 
                                                    {doctor.speciality}	
                                                </NavLink>
                                                <p>{doctor.description}</p>
                                            </div>
                                            )}
                                        </div>
                                    </div>

                                    <div class="medical-block">
                                        <div class="row mb-2">
                                            <div class="col-md-9">
                                                <h2 class="heading-style2">Top <span>Teams</span></h2>
                                            </div>
                                            <div className="col-md-3">
                                            {<NavLink to="/viewallteams" onClick={() => scrollTo(0,0)} className="hvr-icon-wobble-horizontal view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" /></NavLink>}
                                            </div>
                                        </div>
                                        <div class="row">
                                        {Array.isArray(newsDetail.teams) && newsDetail.teams.map((doctor,index) =>
                                            <div className="col-md-4">
                                                <NavLink to={`/team-details/${doctor.team_id}`} onClick={() => scrollTo(0,0)}>	
                                                    <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />
                                                    <h5>{doctor.team_name}</h5> 
                                                    {doctor.speciality}	
                                                </NavLink>
                                                <p>{doctor.name}</p>
                                            </div>
                                            )}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                    {Array.isArray(newsDetail.publications) && newsDetail.publications.map((publication,index) =>
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
		  </>
	    )
    }
export default SearchData;