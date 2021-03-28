import React, { Component } from 'react';
//import dummyVideo from "../../../public/images/dummy-video.mp4";
import videoPoster from "../../../public/images/video-poster.jpg";
import medicalImg1 from "../../../public/images/doc.jpg";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import likeFIllIcon from "../../../public/images/like.svg";
import InnerPageHeader from './InnerPageHeader';
import Swal from 'sweetalert2'
import {NavLink} from "react-router-dom";

class ViewAllVideos extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
            videos: null,
            isLoading: null,
            isLoggedIn: false,
            user: {}
        };
        this.VideoFun =this.VideoFun.bind(this);
		this.updateVideos =this.updateVideos.bind(this);

        const userObj=JSON.parse(localStorage.getItem('appState'));
        this.setState({ isLoading: true});
    }


     
      /*componentDidMount() {
        fetch('http://project.local/get/videos')
          .then(response => response.json())
          .then(data => this.setState({ videos }));
      }*/
  
    componentDidMount() {
        this.getVideos();
    }

    componentWillMount() {
        let state = localStorage["appState"];

        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }

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
		}).then(response => response)
		.then(response => {this.updateVideos();});
    }

    updateVideos(){   
        const userObj=JSON.parse(localStorage.getItem('appState'));
        let parm = `?noauth=null`;
        if(userObj != null){
            parm = `?auth=${userObj.user.id}`;
        }
		axios(`/api/videos${parm}`).then(response=>{
		this.setState({ videos:  response.data})
	
	}
		// this.setState({ publications: response.json(), isLoading: false})
		)}
    
    async getVideos() {
        if (! this.state.videos) {
            try {
                const userObj=JSON.parse(localStorage.getItem('appState'));
                let parm = `?noauth=null`;
                if(userObj != null){
                    parm = `?auth=${userObj.user.id}`;
                }
                this.setState({ isLoading: true});
                //const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch(`/api/videos${parm}`, {
                    /*headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },*/
                });
                const videosList = await response.json();
                this.setState({ videos: videosList, isLoading: false});
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }

    render() {
        return (
            <>
                <InnerPageHeader />
                <div className="subheader">
                    <h1 className="heading-style1">Trending Videos</h1>
                </div>
                <section className="viewallvideospage">
                    <div className="container">
                        {this.state.videos &&
                        <div className="row">
                            {this.state.videos.map(
                                video =>
                            <div className="col-md-4">
                                <div className="theme-block-style">
                                    {(() => {
                                        if (this.state.isLoggedIn && this.state.user.payment_info && video.type == 'paid') {
                                            return (
                                                <NavLink to={`/video-detail/${video.id}`}>
                                                    <video width="100%" className="videoHeight"    poster={`${baseurl}/storage/${video.video}.jpg`}>
                                                        <source
                                                            src={`${baseurl}/storage/${video.video}`}
                                                            type="video/mp4"/>
                                                    </video>
                                                </NavLink>
                                            )
                                        } else if (!(this.state.isLoggedIn && this.state.user.payment_info) && video.type == 'paid') {
                                            return (
                                                <img
                                                    src={`${baseurl}/storage/${video.video}.jpg`}
                                                    style={{width: "100%"}}/>
                                            )
                                        } else {
                                            return (
                                                <NavLink to={`/video-detail/${video.id}`}>
                                                    {localStorage.setItem('videourl' + video.id, video.video)}
                                                    {localStorage.setItem('videoTitle' + video.id, video.name)}
                                                    <video width="100%" className="videoHeight"  poster={`${baseurl}/storage/${video.video}.jpg`}>
                                                        <source
                                                            src={`${baseurl}/storage/${video.video}`}

                                                            type="video/mp4"/>
                                                    </video>
                                                </NavLink>
                                            )
                                        }
                                    })()}
                                   {/* <video loop className="trending-video" controls>
                                        <source src={'storage/'+video.video} type="video/mp4" />
                                    </video>*/}
                                    <h4>{video.name}</h4>
                                    <ul className="block-style">
                                        <li onClick={()=>this.VideoFun(video.id,"like")}>
                                            { localStorage.getItem('likeint'+video.id)<2?
                                            <img src={likeIcon} className="img-fluid" alt="icon" />:
                                            <img src={likeFIllIcon} className="img-fluid" alt="icon" />
                                            }
                                            <h6>{video.likes}</h6>
                                        </li>
                                        <li onClick={()=>this.VideoFun(video.id,"share")} >
                                            <img src={shareIcon} className="img-fluid" alt="icon" />
                                            <h6>{video.shares}</h6>
                                            <input id={`urlCOyLInk${video.id}`} readOnly type="text" className="hideinput" value={baseurl+'/storage/'+video.video}/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            )}
                        </div>
                        }
                    </div>
                </section>
            </>
        )
    }
}

export default ViewAllVideos;