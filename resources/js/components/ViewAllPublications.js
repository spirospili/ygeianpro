import React, { Component } from 'react';
//import dummyVideo from "../../../public/images/dummy-video.mp4";
import videoPoster from "../../../public/images/video-poster.jpg";
import medicalImg1 from "../../../public/images/doc.jpg";
import likeIcon from "../../../public/images/like.png";
import shareIcon from "../../../public/images/share.png";
import InnerPageHeader from './InnerPageHeader';
import { NavLink} from 'react-router-dom';

class ViewAllPublications extends Component {

    constructor(props) {
        super(props);
     
        
        this.state = {
            publications: null,
            isLoading: null
        };
    }
     
      /*componentDidMount() {
        fetch('http://project.local/get/videos')
          .then(response => response.json())
          .then(data => this.setState({ videos }));
      }*/
  
    componentDidMount() {
        this.getPublications();
    }
  

    async getPublications() {
        if (! this.state.publications) {
            try {
                
                /*if(id != undefined){
                    const param = `?auth=${id}`;
                }*/
                const userObj=JSON.parse(localStorage.getItem('appState'));
                let parm = `?noauth=null`;
                if(userObj != null){
                    parm = `?auth=${userObj.user.id}`;
                }
                this.setState({ isLoading: true });
                //const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch(`/api/publications${parm}`, {
                    /*headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },*/
                });
                const publicationsList = await response.json();
                this.setState({ publications: publicationsList, isLoading: false});
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
                    <h1 className="heading-style1">Medical Publications</h1>
                </div>
                <section className="viewallvideospage">
                    <div className="container">
                    {this.state.publications &&
                        <div className="row">
                            {this.state.publications.map(
                            publication => 
                            <div className="col-md-6">
                                <div className="theme-block-style medical-list">
                                    <iframe src={'storage/'+publication.path} width="100%" height="280" frameborder="0" allowfullscreen></iframe>
                                    <NavLink to="#" data-toggle="modal" data-target={'#publicationModal-'+publication.id}>
                                        <h4>{publication.name}</h4>										
                                    </NavLink>
                                    <ul className="block-style">
                                        <li>
                                            <img src={likeIcon} className="img-fluid" alt="icon" />
                                            <h6>0</h6>
                                        </li>
                                        <li>
                                            <img src={shareIcon} className="img-fluid" alt="icon" />
                                            <h6>0</h6>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            )}
                        </div>
                        }
                    </div>
                </section>

                {this.state.publications &&
                    <div>
                        {this.state.publications.map(
                            publication => 
                                <div class="modal fade" id={'publicationModal-'+publication.id} tabindex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
                                    <div class="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
                                        <div class="modal-content-full-width modal-content ">
                                            <div class=" modal-header-full-width modal-header text-center">
                                                <button type="button" class="close " data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <iframe src={'storage/'+publication.path} width="100%" height="500" frameborder="0" allowfullscreen></iframe>	
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )}
                    </div>
                }
            </>
        )
    }
}

export default ViewAllPublications;