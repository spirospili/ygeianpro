import React, { useEffect, useState } from "react";
import InnerPageHeader from "./InnerPageHeader";
import { NavLink, useParams, Link } from "react-router-dom";
import EmailOverlay from "./EmailOverlay";
import { FileIcon, defaultStyles } from 'react-file-icon';
import ReactPlayer from "react-player";
function MasterclassDetails() {
    let { id, videoID } = useParams();
    const [videoDetail, setVideoDetail] = useState({});
    const [doctorDetail, setDoctorDetail] = useState([]);
    const videoGet = localStorage.getItem(`videourl${id}`);
    const videoHeading = localStorage.getItem(`videoTitle${id}`);
    const [display, setDisplay] = useState(false);
    const [metadata, setMetadata] = useState([]);
    var duration;
    const pStyle = {
        margin: "10px"
    };
    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem("appState"));
        //const userTocken= userObj.user.access_token
        axios
            .get(`/api/masterclasses/${id}`, {
                headers: {
                    Accept: "application/json"
                    //'Authorization': `Bearer ${userTocken}`,
                }
            })
            .then(response => {
                console.log("doctor follow", response.data);
                setVideoDetail(response.data);

                response.data.curators.map((data, index) => {
                    axios
                        .get(`/api/doctors/${data.doctor_id}`)
                        .then(response => {
                            console.log(response.data.doctor);
                            setDoctorDetail(Array => [
                                ...Array,
                                response.data.doctor
                            ]);
                        });
                });
            });
    }, []);

    console.log("Video Detail", videoDetail);

    const displayHandler = () => {
        setDisplay(true);
    };
    const displayCancelHandler = () => {
        setDisplay(false);
    };

    function stringContainer(value) {
        if (value != null) {
            const val = value.match(/[A-Z, a-z]/g);
            if (val === null) {
                return false;
            }
            return true;
        }
    }
    return (
        <div>
            <InnerPageHeader />
            <EmailOverlay
                show={display}
                EmailOverlayClosed={displayCancelHandler}
            >
                <div className="invite-doctor">
                    {Array.isArray(doctorDetail) &&
                        doctorDetail.map((data, index) => (
                            <div className="row">
                                <div className="lead-img masterclass-detail">
                                    <span>
                                        <img
                                            src={`${baseurl}/storage/${data?.path}`}
                                            className="img-fluid"
                                            alt="doctor"
                                        />
                                    </span>
                                </div>
                                <h6
                                    className=""
                                    style={{
                                        textAlign: "center",
                                        paddingTop: "40px",
                                        paddingLeft: "5px"
                                    }}
                                >
                                    {data.name}
                                </h6>
                            </div>
                        ))}
                </div>
            </EmailOverlay>
            <section
                className="content-section"
                style={{ margin: "auto", width: "85%" }}
            >
                <div className="col">
                    <h2 className="heading-style1 text-center">
                        {videoDetail.masterclass_title} <span></span>
                    </h2>

                    {videoDetail.subclasses ? (
                        stringContainer(
                            videoDetail.subclasses[videoID].path
                        ) === false ? (
                            <ReactPlayer
                                width="100%"
                                url={
                                    "https://www.vimeo.com/" +
                                    videoDetail.subclasses[videoID].path
                                }
                                controls={true}
                            />
                        ) : (
                            <ReactPlayer
                                width="100%"
                                url={
                                    "https://www.youtube.com/watch?v=" +
                                    videoDetail.subclasses[videoID].path
                                }
                                controls={true}
                            />
                        )
                    ) : (
                        ""
                    )}

                    {/* {videoDetail.subclasses ? (
                        <ReactPlayer
                            width="100%"
                            url={
                                "https://www.youtube.com/watch?v=" +
                                videoDetail.subclasses[videoID].path
                            }
                            controls={true}
                        />
                    ) : (
                        ""
                    )} */}

                    <div className="row border-box">
                        {Array.isArray(videoDetail.subclasses) &&
                            videoDetail.subclasses.map((data, index) =>
                                videoID == index ? (
                                    <div className="col-md-6 border-inside ">
                                        <h1 className="">
                                            <b>{data.video_title}</b>
                                        </h1>
                                        <p>{data.description}</p>
                                    </div>
                                ) : (
                                    ""
                                )
                            )}
                        <div className="col doctor-masterclass-page">
                            <div className="row">
                                <h1 className="col">
                                    <b>Curators</b>
                                </h1>
                            </div>
                            <div className="row">
                                {Array.isArray(doctorDetail) &&
                                    doctorDetail.map((data, index) =>
                                        index < 4 ? (
                                            <a
                                                href={`/doctor-details/${data?.id}`}
                                            >
                                                <div className="col-md-3">
                                                    <div className="lead-img masterclass-detail">
                                                        <span>
                                                            <img
                                                                src={`${baseurl}/storage/${data.path}`}
                                                                className="img-fluid"
                                                                alt="doctor"
                                                            />
                                                        </span>
                                                    </div>
                                                    <h5
                                                        className=""
                                                        style={{
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {data.name}
                                                    </h5>
                                                </div>
                                            </a>
                                        ) : index == 4 ? (
                                            <div className="col-md-3">
                                                <div
                                                    className=""
                                                    onClick={() =>
                                                        displayHandler()
                                                    }
                                                >
                                                    <span>
                                                        <b>View All</b>
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="lead-img masterclass-detail">
                  <span onClick={()=>displayHandler()}> View All</span>
            </div> */}
                    <div className="row" style={{ paddingTop: "10px" }}>
                        <h1 className="col">
                            <b>Next Classes</b>
                            <p>Videos</p>
                        </h1>
                    </div>
                    <div className="row">
                        {Array.isArray(videoDetail?.subclasses) &&
                          videoDetail.subclasses.filter(sc => sc.file === null).map((data, index) =>
                                videoID != index ? (
                                    <div className="col-md-3">
                                        <div className="theme-block-style">
                                            {(() => {
                                                console.log("Data", data, index);
                                                console.log("Base URL", `${baseurl}/storage/${data.file}`);
                                                return (
                                                    <NavLink
                                                        to={`/masterclass-detail/${id}/${index}`}
                                                    >
                                                        {localStorage.setItem(
                                                            "videourl" +
                                                                data.id,
                                                            data.path
                                                        )}
                                                        {localStorage.setItem(
                                                            "videoTitle" +
                                                                data.id,
                                                            data.video_title
                                                        )}

                                                        {/* <video width="100%" className="videoHeight"
                                              //  controls poster={`${baseurl}/storage/${data?.subclasses[0]?.thumbnail}`}
                                               onLoadedMetadata={e => {
                                                                                    
                                                const el1 = document.querySelector("#index"+index)
                                                duration=e.target.duration; 
                                                setMetadata(
                                                
                                                     Array => [...Array, duration]
                                                );
                                              }}
                                             >
                                                  <source src={`${baseurl}/storage/${data?.path}`} type="video/mp4"/>
                                             </video>	 */}


                                             {data.file === null ? (<video
                                                 width="100%"
                                                 className="videoHeight"
                                                 control
                                                 poster={`${baseurl}/storage/${data.thumbnail}`}
                                             >
                                                 <source
                                                     src={
                                                         "https://img.youtube.com/vi/" +
                                                         data?.path +
                                                         "/sddefault.jpg"
                                                     }
                                                 />
                                             </video>): null}
                                             
                                            
                                                        
                                                    </NavLink>
                                                );
                                            })()}

                                            {/* <h4 style={{textAlign:"center"}}>{data.video_title}</h4>
                            {metadata.length===videoDetail.subclasses.length-1? (
                                                            
                                                            
                                                            <p style={pStyle}>
                                                                <b>Duration:</b> {(parseInt(metadata[index]/60)) +" min"} 
                                                            </p>
                                                        
                                                        ):""}
                                                        <p style={pStyle}> <b>Published date:</b> {data.created_at.split("T")[0]}</p>
                            <p style={pStyle}> {data.description.length > 50 ? data.description.substring(0, 50) : data.description} {data.description.length > 50 ? "..." : ""}</p> */}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )
                            )}
                    </div>
                    <div className="row" style={{ paddingTop: "10px" }}>
                        <h1 className="col">
                            <p>Files</p>
                        </h1>
                    </div>
                    <div className="row">
                        {Array.isArray(videoDetail?.subclasses) &&
                            videoDetail.subclasses.filter(sc => sc.file != null).map((data, index) =>
                                videoID != index ? (
                                    <div className="col-md-3">
                                        <div className="theme-block-style">
                                            {(() => {
                                                console.log("Splitttt", data.file.split(".")[1])
                                                return (
                                                    <Link
                                                        to={`${baseurl}/storage/${data?.file}`}
                                                    >
                                                        <FileIcon extension={data.file.split(".")[1]} {...defaultStyles[data.file.split(".")[1]]} />
                                                        <h4>{data.video_title}</h4>

                                                        
                        {/* {data.file && (<iframe className="videoHeight" src={`${baseurl}/storage/${data?.file}&embedded=true`} width='100%'></iframe>)} */}
                                            
                                             
                                            
                                                        
                                                    </Link>
                                                );
                                            })()}

                                           
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )
                            )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MasterclassDetails;
