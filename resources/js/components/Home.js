import React, {Component} from 'react';
import ReactDom from 'react-dom';
import scrollImg from "../../../public/images/Group1269.png";
import nextWhiteIcon from "../../../public/images/next.png";
import nextBlueIcon from "../../../public/images/next-1.png";
//import dummyVideo from "../../../public/images/dummy-video.mp4";
import videoPoster from "../../../public/images/video-poster.jpg";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import likeFIllIcon from "../../../public/images/like.svg";
import doctorImageAbout from "../../../public/images/doctor-image.jpg";
import shareFillIcon from "../../../public/images/share.svg";
import topDoctor1 from "../../../public/images/Group1238.png";
import topDoctor2 from "../../../public/images/Group1239.png";
import medicalImg1 from "../../../public/images/doc.jpg";
import liveVideoImage from "../../../public/images/live-Web.png";
import liveVideoPoster from "../../../public/images/live-video.jpg";
import {NavLink} from 'react-router-dom';
import Header from './Header';
import SearchBar from './SearchBar';
import ViewAllVideos from './ViewAllVideos';
import ViewAllDoctors from './ViewAllDoctors';
import ViewAllPublications from './ViewAllPublications';
import Swal from 'sweetalert2'
import axios from './api'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            live_video: null,
            videos: null,
            publications: null,
            doctors: null,
            teams: null,
            masterclasses:null,
            isLoading: null,
            isLoggedIn: false,
            user: {}
        };
        this.publicationFunc = this.publicationFunc.bind(this);
        this.updatePublication = this.updatePublication.bind(this);
        this.VideoFun = this.VideoFun.bind(this);
        this.updateVideos = this.updateVideos.bind(this);

        // this.coppyLInk =this.coppyLInk.bind(this);

    }

    // coppyLInk(){
    // 		var textUrl = document.getElementById("urlCOyLInk");
    // 		textUrl.select();
    // 		textUrl.setSelectionRange(0, 99999)
    // 		document.execCommand("copy");
    // 		// alert("Copied the text: " + textUrl.value);
    // 		Swal.fire("", "copy Url Successfylly ", "success")
    // 	}
    // check if user is authenticated and storing authentication data as states if true
    componentWillMount() {
        let state = localStorage["appState"];

        if (state) {
            let AppState = JSON.parse(state);
            this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }

    }

    publicationFunc(id, selection) {
        const userObj = JSON.parse(localStorage.getItem('appState'));
        const userId = userObj.user.id
        const userTocken = userObj.user.access_token
        let formData = new FormData();
        formData.append('_method', 'put');
        let checker;

        if (selection == "like") {
            if (localStorage.getItem('imgLike' + id) < 1) {
                checker = `/api/publications/${id}?like=1`
                localStorage.setItem('imgLike' + id, "2")
                localStorage.setItem('likeintp' + id, 2)
            } else {
                checker = `/api/publications/${id}?unlike=1`
                localStorage.removeItem('imgLike' + id, "2")
                localStorage.removeItem('likeintp' + id, 2)
            }
        }


        if (selection == "share") {
            checker = `/api/publications/${id}?share=1`
            var textUrl = document.getElementById(`urlImgLInk${id}`);
            textUrl.style.display = "block"
            textUrl.select();
            document.execCommand("copy");
            Swal.fire("", "copy Url Successfylly ", "success")
            textUrl.style.display = null
        }
        axios.post(checker, formData, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }
        }).then(response => response)
            .then(response => {
                this.updatePublication();
            });
    }

    VideoFun(id, selection) {
        const userObj = JSON.parse(localStorage.getItem('appState'));
        const userId = userObj.user.id
        const userTocken = userObj.user.access_token
        let formData = new FormData();
        formData.append('_method', 'put');
        let checker;
        if (selection == "like") {
            if (localStorage.getItem('videoLike' + id) < 1) {
                checker = `/api/videos/${id}?like=1`
                localStorage.setItem('videoLike' + id, "2")
                localStorage.setItem('likeint' + id, "2")
            } else {
                checker = `/api/videos/${id}?unlike=1`
                localStorage.removeItem('videoLike' + id, "2")
                localStorage.removeItem('likeint' + id, "2")
            }
        }

        if (selection == "share") {
            checker = `/api/videos/${id}?share=1`;
            var textUrl = document.getElementById(`urlCOyLInk${id}`);
            textUrl.style.display = "block"
            textUrl.select();

            textUrl.setSelectionRange(0, 99999)
            document.execCommand("copy");
            // alert("Copied the text: " + textUrl.value);
            Swal.fire("", "copy Url Successfylly ", "success")
            textUrl.style.display = null
        }
        axios.post(checker, formData, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userTocken}`,
            }
        }).then(response => response)
            .then(response => {
                this.updateVideos();
            });
    }

    /*componentDidMount() {
      fetch('http://project.local/get/videos')
        .then(response => response.json())
        .then(data => this.setState({ videos }));
    }*/

    componentDidMount() {
        this.getLiveVideo();
        this.getVideos();
        this.getPublications();
        this.getDoctors();
        this.getMasterclasses();
        this.getTeams();
    }

    async getLiveVideo() {
        if (!this.state.live_video) {
            try {
                this.setState({isLoading: true});
                //const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch('/api/live/session', {
                    /*headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },*/
                });
                const liveVideo = await response.json();
                console.log(liveVideo);
                this.setState({live_video: liveVideo, isLoading: false});
            } catch (err) {
                this.setState({isLoading: false});
                console.error(err);
            }
        }
    }
    async getTeams() {
        if (!this.state.teams) {
            try {
                this.setState({isLoading: true});
                //const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch('/api/teams?page=home', {
                    /*headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },*/
                });
                const teams = await response.json();
                this.setState({teams: teams, isLoading: false});
            } catch (err) {
                this.setState({isLoading: false});
                console.error(err);
            }
        }
    }
    async getMasterclasses() {
        if (!this.state.masterclasses) {
            try {
                this.setState({isLoading: true});
                //const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch('/api/masterclasses?page=home', {
                    /*headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },*/
                });
                const masterclasses = await response.json();
                this.setState({masterclasses: masterclasses, isLoading: false});
            } catch (err) {
                this.setState({isLoading: false});
                console.error(err);
            }
        }
    }
    async getVideos() {
        if (!this.state.videos) {
            try {
                this.setState({isLoading: true});
                //const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch('/api/videos?page=home', {
                    /*headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },*/
                });
                const videosList = await response.json();
                this.setState({videos: videosList, isLoading: false});
            } catch (err) {
                this.setState({isLoading: false});
                console.error(err);
            }
        }
    }

    updatePublication() {
        axios("/api/publications?page=home").then(response => {
                console.log("responsepi", response);
                this.setState({publications: response.data})

            }
        )
    }

    updateVideos() {
        axios("/api/videos?page=home").then(response => {
                console.log("responsepi", response);
                this.setState({videos: response.data})

            }
            // this.setState({ publications: response.json(), isLoading: false})
        )
    }

    async getPublications() {
        if (!this.state.publications) {
            try {
                this.setState({isLoading: true});
                //const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch('/api/publications?page=home', {
                    /*headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },*/
                });
                const publicationsList = await response.json();
                this.setState({publications: publicationsList, isLoading: false});
            } catch (err) {
                this.setState({isLoading: false});
                console.error(err);
            }
        }
    }

    async getDoctors() {
        if (!this.state.doctors) {
            try {
                this.setState({isLoading: true});
                //const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch('/api/doctors?page=home', {
                    /*headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },*/
                });
                const doctorsList = await response.json();
                this.setState({doctors: doctorsList, isLoading: false});
            } catch (err) {
                this.setState({isLoading: false});
                console.error(err);
            }
        }
    }

    render() {

        return (
            <>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
                <section className="main-banner">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h1>See The best Doctors in Action. Learn new techniques through Live streaming from the
                                    best Hospitals</h1>
                                <p>We are YGEIAN Pro. A multimedia library with Live Streamed and Recorded videos from
                                    OR, Medical Journals from Top Doctors around the world. Join seminars and courses
                                    and learn new techniques from the best.</p>
                                {this.state.isLoggedIn && this.state.user.payment_info ?
                                    null
                                    :
                                    <NavLink
                                        to={this.state.isLoggedIn && this.state.user.payment_info == null ? '/pricing' : '/signup'}
                                        className="theme-btn">Start a Free Trial</NavLink>
                                }
                                <SearchBar/>
                                <img src={scrollImg} className="img-fluid scrolling-img" alt="slider"/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about-section doctor-signature">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src={doctorImageAbout} class="img-responsive"/>
                                    </div>
                                    <div className="col-md-6 doctor-sig-center">
                                        <p>When you share your passion then medicine becomes art.</p>
                                        <h3>Sotirios Prapas M.D.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="trending-section">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 trending-block">
                                <div className="row mb-2">
                                    <div className="col-md-9">
                                        <h2 className="heading-style2">Trending <span>Videos</span></h2>
                                    </div>
                                    <div className="col-md-3">
                                        <NavLink to="/ViewAllVideos" onClick={() => scrollTo(0, 0)}
                                                 className="hvr-icon-wobble-horizontal view-all-btn">
                                            View all <img src={nextWhiteIcon} className="img-fluid hvr-icon"
                                                          alt="arrow"/>
                                        </NavLink>
                                    </div>
                                </div>

                                {this.state.videos &&

                                <div className="trending-slider row">
                                    {this.state.videos.map(
                                        (video, i) =>
                                            <div className="col-md-6">
                                                <div className="theme-block-style">

                                                    {(() => {
                                                        if (this.state.isLoggedIn && this.state.user.payment_info && video.type == 'paid') {
                                                            return (
                                                                <NavLink to={`/video-detail/${video.id}`}>
                                                                    {/* <video width="100%" className="videoHeight"  poster={`${baseurl}/storage/${video.video}.jpg`}>
                                                                        <source
                                                                            src={`${baseurl}/storage/${video.video}`}
                                                                            type="video/mp4"/>
                                                                    </video> */}
                                                        <img width="100%" className="videoHeight" src={"https://img.youtube.com/vi/"+video.video+"/sddefault.jpg"}/>

                                                                </NavLink>
                                                            )
                                                        } else if (!(this.state.isLoggedIn && this.state.user.payment_info) && video.type == 'paid') {
                                                            return (
                                                                // <img
                                                                //     src={`${baseurl}/storage/${video.video}.jpg`}
                                                                //     style={{width: "100%"}}/>
                                                                <img width="100%" className="videoHeight" src={"https://img.youtube.com/vi/"+video.video+"/sddefault.jpg"}/>

                                                            )
                                                        } else {
                                                            return (
                                                                <NavLink to={`/video-detail/${video.id}`}>
                                                                    {localStorage.setItem('videourl' + video.id, video.video)}
                                                                    {localStorage.setItem('videoTitle' + video.id, video.name)}
                                                                    {/* <video width="100%" className="videoHeight"
                                                                           poster={`${baseurl}/storage/${video.video}.jpg`}>
                                                                        <source
                                                                            src={`${baseurl}/storage/${video.video}`}
                                                                            type="video/mp4"/>
                                                                    </video> */}
                                                            <img width="100%" className="videoHeight" src={"https://img.youtube.com/vi/"+video.video+"/sddefault.jpg"}/>

                                                                </NavLink>
                                                            )
                                                        }
                                                    })()}
                                                    {/*<NavLink onClick={() => scrollTo(0,0)} to={`/video-detail/${video.id}`}>
											 {localStorage.setItem('videourl'+video.id,video.video)}
											 {localStorage.setItem('videoTitle'+video.id,video.name)}
										 <video width="100%" className="videoHeight" >
											<source src={'/storage/'+video.video} type="video/mp4" />
										</video>
										</NavLink>*/}

                                                    <h4>{video.name} </h4>
                                                    <p className="doctor-subscribe" >{!this.state.user.payment_info && video.type == 'paid' ? 'Subscribe to watch video' : 'Click to Watch'}</p>
                                                    <ul className="block-style">
                                                        <li onClick={() => this.VideoFun(video.id, "like")}>
                                                            {localStorage.getItem('likeint' + video.id) < 2 ?
                                                                <img src={likeIcon} className="img-fluid" alt="icon"/> :
                                                                <img src={likeFIllIcon} className="img-fluid"
                                                                     alt="icon"/>
                                                            }
                                                            <h6>{video.likes}</h6>
                                                        </li>
                                                        <li onClick={() => this.VideoFun(video.id, "share")}>
                                                            <img src={shareIcon} className="img-fluid" alt="icon"/>
                                                            <h6>{video.shares}</h6>
                                                            <input id={`urlCOyLInk${video.id}`} readOnly type="text"
                                                                   className="hideinput"
                                                                   value={baseurl + '/storage/' + video.video}/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                    )}
                                </div>
                                }
                            </div>
                            <div className="col-md-6 doctor-block">
                                <div className="top-doctor">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <h2 className="heading-style1">Top <span>Doctors</span></h2>
                                        </div>
                                        <div className="col-md-3">
                                            <NavLink to="/ViewAllDoctors" onClick={() => scrollTo(0, 0)}
                                                     className="hvr-icon-wobble-horizontal view-all-btn">
                                                View all <img src={nextWhiteIcon} className="img-fluid hvr-icon blue"
                                                              alt="arrow"/>
                                            </NavLink>
                                        </div>
                                    </div>
                                    {this.state.doctors &&
                                    <div className="row text-center">
                                        {this.state.doctors.map(
                                            doctor =>
                                                <div className="col-md-6">
                                                    <NavLink to={`/doctor-details/${doctor.id}`}
                                                             onClick={() => scrollTo(0, 0)}>
                                                        <img src={'storage/' + doctor.path} style={{width: '100%'}}
                                                             alt="doctor"/>
                                                        <h5>{doctor.name}</h5>
                                                    </NavLink>
                                                    <p>{doctor.description}</p>

                                                </div>
                                        )}
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="medical-publish">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="medical-block">
                                    <div className="row mb-2">
                                        <div className="col-md-9">
                                            <h2 className="heading-style2">Medical <span>Publications</span></h2>
                                        </div>
                                        <div className="col-md-3">
                                            <NavLink to="/ViewAllPublications" onClick={() => scrollTo(0, 0)}
                                                     className="hvr-icon-wobble-horizontal view-all-btn">View all <img
                                                src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow"/>
                                            </NavLink>
                                        </div>
                                    </div>
                                    {this.state.publications &&
                                    <div className="row">
                                        {this.state.publications.map(
                                            publication =>
                                                <div className="col-md-6">
                                                    <div className="theme-block-style medical-list">
                                                        <iframe src={'storage/' + publication.path} width="100%"
                                                                height="280" frameborder="0" allowFullScreen></iframe>
                                                        <NavLink to="#" data-toggle="modal"
                                                                 data-target={'#publicationModal-' + publication.id}>
                                                            <h4>{publication.name}</h4>
                                                        </NavLink>
                                                        <ul className="block-style">

                                                            <li onClick={() => this.publicationFunc(publication.id, "like")}>
                                                                {localStorage.getItem('likeintp' + publication.id) < 2 ?
                                                                    <img src={likeIcon} className="img-fluid"
                                                                         alt="icon"/> :
                                                                    <img src={likeFIllIcon} className="img-fluid"
                                                                         alt="icon"/>
                                                                }
                                                                <h6>{publication.likes}</h6>
                                                            </li>
                                                            <li onClick={() => this.publicationFunc(publication.id, "share")}>
                                                                <img src={shareIcon} className="img-fluid" alt="icon"/>
                                                                <h6>{publication.shares}</h6>
                                                                <input id={`urlImgLInk${publication.id}`} readOnly
                                                                       type="text"
                                                                       value={baseurl + '/storage/' + publication.path}
                                                                       className="hideinput"/>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                        )}
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="live-operate">
                                    <div className="row mb-2">
                                        <div className="col-md-9">
                                            <h2 className="heading-style2">Live Operations <span>Room</span></h2>
                                        </div>
                                        {/*<div className="col-md-3">
										<NavLink to="#" className="hvr-icon-wobble-horizontal float-right view-all-btn">View all <img src={nextBlueIcon} className="img-fluid hvr-icon" alt="arrow" />	
										</NavLink>
									</div>*/}
                                    </div>
                                    <div className="row">
                                        {this.state.live_video &&
                                        <div className="col-md-12">
                                            {this.state.live_video.map((video, index) =>
                                                <div>
                                                    {
                                                        video.live_video ?
                                                            <iframe width="100%" height="280" key={index}
                                                                    src={'https://player.vimeo.com/video/' + video.live_video}
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen></iframe>
                                                            :
                                                            <img src={liveVideoImage} className="img-fluid" alt="icon"/>
                                                    }
                                                </div>
                                            )}
                                            {/*<video width="100%" className="trending-video" controls poster={liveVideoPoster}>
											<source src="https://www.youtube.com/embed/_oL8gBQbZfI" type="video/mp4" />
										</video>*/}
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="trending-section">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 trending-block">
                                <div className="row mb-2">
                                    <div className="col-md-9">
                                        <h2 className="heading-style2">Top <span>Teams</span></h2>
                                    </div>
                                    <div className="col-md-3">
                                        <NavLink to="/ViewAllTeams" onClick={() => scrollTo(0, 0)}
                                                 className="hvr-icon-wobble-horizontal view-all-btn">
                                            View all <img src={nextWhiteIcon} className="img-fluid hvr-icon"
                                                          alt="arrow"/>
                                        </NavLink>
                                    </div>
                                </div>

                                {this.state.teams &&

                                <div className="trending-slider row">
                                    {this.state.teams.map( doctor=>
                                      <div className="col-md-6">
                                         <NavLink to={`/team-details/${doctor.team_id}`} onClick={() => scrollTo(0,0)}>	
                                         <img src={`${baseurl}/storage/${doctor.path}`} className="img-fluid" alt="doctor" />                
                                         <h5>{doctor.team_name}</h5> 
                                             {doctor.speciality}
                                         </NavLink>	
                                         <p>{doctor.description}</p>
                                     </div>
                                    )}
                                </div>
                                }
                            </div>
                            <div className="col-md-6 doctor-block">
                                <div className="top-doctor">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <h2 className="heading-style1">Master<span>classes</span></h2>
                                        </div>
                                        <div className="col-md-3">
                                            <NavLink to="/ViewAllMasterclasses" onClick={() => scrollTo(0, 0)}
                                                     className="hvr-icon-wobble-horizontal view-all-btn">
                                                View all <img src={nextWhiteIcon} className="img-fluid hvr-icon blue"
                                                              alt="arrow"/>
                                            </NavLink>
                                        </div>
                                    </div>
                                    {this.state.masterclasses &&
                                    <div className="row text-center">
                                        {this.state.masterclasses.map(
                                            doctor =>
                                            <div className="col-md-6">
                                            <NavLink to={`/masterclass-detail/${doctor.id}/0`}>
                                                              {/* {localStorage.setItem('videourl'+data.id,data.video)}
                                                              {localStorage.setItem('videoTitle'+data.id,data.name)} */}
                                                              {/* <video width="100%" className="videoHeight" >
                                                                  <source src={`${baseurl}/storage/${doctor?.subclasses[0]?.path}`} type="video/mp4" />
                                                              </video>								 */}
                                        <img width="100%" className="videoHeight" src={"https://img.youtube.com/vi/"+doctor?.subclasses[0]?.path+"/sddefault.jpg"}/>

                                             </NavLink>	
                                          <h4>{doctor.masterclass_title}</h4>
                                          <p>{doctor.description}</p>
                                      </div>
                                        )}
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* {this.state.videos &&
			<div>
				{this.state.videos.map(
					(video,index) => 
						<div key={index} className="modal fade" id={'videoModal-'+video.id} tabindex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
							<div className="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
								<div className="modal-content-full-width modal-content ">
									<div className=" modal-header-full-width modal-header text-center">
										<button type="button" className="close " data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<video width="100%" autoPlay controls>
											<source src={'storage/'+video.video} type="video/mp4" />
										</video>
									</div>
								</div>
							</div>
						</div>
				)}
				</div>
			} */}

                {this.state.publications &&
                <div>
                    {this.state.publications.map(
                        (publication, index) =>
                            <div key={index} className="modal fade" id={'publicationModal-' + publication.id}
                                 tabindex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
                                <div className="modal-dialog-full-width modal-dialog momodel modal-fluid"
                                     role="document">
                                    <div className="modal-content-full-width modal-content ">
                                        <div className=" modal-header-full-width modal-header text-center">
                                            <button type="button" className="close " data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <iframe src={'storage/' + publication.path} width="100%" height="500"
                                                    frameborder="0" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )}
                </div>
                }
            </>
        );
    }
}

export default Home;