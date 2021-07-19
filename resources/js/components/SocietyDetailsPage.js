import React, { useEffect, useState } from "react";
import InnerPageHeader from "./InnerPageHeader";
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
import Footer from "./Footer";
import ViewAllVideos from "./ViewAllVideos";
import ViewAllDoctors from "./ViewAllDoctors";
import ViewAllPublications from "./ViewAllPublications";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "./api";
import EmailOverlay from "./EmailOverlay";
import InviteEmailForm from "./InviteEmailForm";

function SocietyDetailsPage() {
    var duration;

    let formData = new FormData();
    let { id } = useParams();
    const [name, setName] = useState("");
    const [invite, setInvite] = useState(false);
    const [payment, setPayment] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [follows, setFollows] = useState([]);
    const [followsLimit, setFollowsLimit] = useState([]);
    const [suggestedVideos, getSuggestedVideos] = useState([]);
    const [suggestedMasterclasses, getSuggestedMasterclasses] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    const pStyle = {
        margin: "10px"
    };
    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem("appState"));

        if (id != undefined) {
            localStorage.setItem("societyid", id);
        }
        const societyId = localStorage.getItem("societyid");

        if (userObj != null) {
            setName(userObj.user.name);

            const userTocken = userObj.user.access_token;

            axios.get(`/api/society/${societyId}`).then(response => {
                setFollows(response.data);
            });
            console.log(follows);

            setTrigger(false);
        } else {
            axios.get(`/api/society/${societyId}`).then(response => {
                setFollows(response.data);
            });
            console.log(follows);

            setTrigger(false);
        }
    }, [trigger]);
    console.log(followsLimit);
    const inviteHandler = () => {
        setInvite(true);
    };
    const inviteCancelHandler = () => {
        setInvite(false);
    };

    const VideoFun = (id, selection) => {
        const userObj = JSON.parse(localStorage.getItem("appState"));
        const userId = userObj.user.id;
        const userTocken = userObj.user.access_token;
        let formData = new FormData();
        formData.append("_method", "put");
        let checker;
        if (selection == "like") {
            if (localStorage.getItem("videoLike" + id) < 1) {
                checker = `/api/videos/${id}?like=1`;
                localStorage.setItem("videoLike" + id, "2");
                localStorage.setItem("likeint" + id, "2");
            } else {
                checker = `/api/videos/${id}?unlike=1`;
                localStorage.removeItem("videoLike" + id, "2");
                localStorage.removeItem("likeint" + id, "2");
            }
        }

        if (selection == "share") {
            checker = `/api/videos/${id}?share=1`;
            var textUrl = document.getElementById(`urlCOyLInk${id}`);
            textUrl.style.display = "block";
            textUrl.select();

            textUrl.setSelectionRange(0, 99999);
            document.execCommand("copy");
            // alert("Copied the text: " + textUrl.value);
            Swal.fire("", "copy Url Successfylly ", "success");
            textUrl.style.display = null;
        }
        axios
            .post(checker, formData, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userTocken}`
                }
            })
            .then(response => {
                updateResource();
            });
    };

    const tabActive = e => {
        console.log(e.target.id);
        document.getElementById("dr-feed-tab").classList.remove("active");
        document.getElementById("dr-video-tab").classList.remove("active");
        document.getElementById("dr-img-tab").classList.remove("active");
        document.getElementById("dr-document-tab").classList.remove("active");
        document.getElementById(e.target.id).classList.add("active");
        scrollTo(0, 0);
    };

    const updateResource = () => {
        const userObj = JSON.parse(localStorage.getItem("appState"));
        const userTocken = userObj.user.access_token;
        console.log("idchecker ======>", id);
        if (id != undefined) {
            localStorage.setItem("doctorid", id);
        }
        const docId = localStorage.getItem("doctorid");
        axios
            .get(`/api/teams/${teamId}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userTocken}`
                }
            })
            .then(response => {
                setFollows(response.data);
            });
        setTrigger(false);
    };

    return (
        <>
            <InnerPageHeader />
            
            <section className="inner-page-content doctor-team-page">
                <div className="container-margin container-fluid">
                    <div className="row no-gutters" style={{ width: "100%" }}>
                        <div className="col">
                            <div className="right-content-area">
                                <div className="row align-items-center mb-4 single-doctor">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-3 lead-img team-detail">
                                        <span>
                                            <img
                                                src={`${baseurl}/storage/${follows[0]?.path}`}
                                                className="img-fluid"
                                                alt="doctor"
                                            />
                                        </span>
                                    </div>
                                    <div className="col-md-5">
                                        <h2 className="heading-style3">
                                            {follows[0]?.society_name}
                                        </h2>

                                        <p>{follows[0]?.description}</p>
                                    </div>
                                </div>
                                {/* <hr
                                    style={{
                                        color: "#E8E8E8",
                                        backgroundColor: "#E8E8E8",
                                        height: 5
                                    }}
                                /> */}
                                                     <div className="profile-latest-videos">

                                <form
                                    action=""
                                    className="searchbar-style mt-5 mb-5"
                                    style={{ paddingLeft: "10%" }}
                                >
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            value={searchKey}
                                            onChange={e => {
                                                setSearchKey(e.target.value);
                                            }}
                                            className="form-control"
                                            placeholder="Search by keyword"
                                        />
                                        <span className="input-group-btn">
                                            <button
                                                className="btn"
                                                disabled={true}
                                            >
                                                Search
                                            </button>
                                        </span>
                                    </div>
                                </form>
                                <div className="row" style={{ paddingLeft: "10%" }}>
                                    <div
                                        className="col"
                                        
                                    >
                                        <h2
                                            className=" heading-style2"
                                            style={{ textAlign: "left" }}
                                        >
                                            Our Doctors
                                        </h2>
                                    </div>
                                    <div className="col">
                                        <NavLink
                                            to="/ViewAllDoctors"
                                            className="hvr-icon-wobble-horizontal view-all-btn"
                                        >
                                            View all{" "}
                                            <img
                                                src={nextBlueIcon}
                                                className="img-fluid hvr-icon"
                                                alt="arrow"
                                            />
                                        </NavLink>
                                    </div>
                                </div>
                                <div
                                    className="row  single-doctor"
                                    style={{ paddingLeft: "10%" }}
                                >
                                    {Array.isArray(follows[0]?.doctors) &&
                                        follows[0]?.doctors.filter(data => data.name.includes(searchKey)).map(
                                            (doctor, index) => (
                                                <div className="col-md-4">
                                                    <NavLink
                                                        to={`/doctor-details/${doctor.id}`}
                                                        onClick={() =>
                                                            scrollTo(0, 0)
                                                        }
                                                    >
                                                        <img
                                                            src={`${baseurl}/storage/${doctor.path}`}
                                                            className="img-fluid"
                                                            alt="doctor"
                                                        />
                                                        <h5>{doctor.name}</h5>
                                                        {doctor.speciality}
                                                    </NavLink>
                                                </div>
                                            )
                                        )}
                                </div>
                                
                                    <div className="row"  style={{ paddingLeft: "10%" }}>
                                        <div
                                            className="col"
                                            
                                        >
                                            <h2
                                                className="heading-style2"
                                                style={{ textAlign: "left" }}
                                            >
                                                Videos
                                            </h2>
                                        </div>
                                        <div className="col">
                                            <NavLink
                                                to="/ViewAllVideos"
                                                className="hvr-icon-wobble-horizontal view-all-btn"
                                            >
                                                View all{" "}
                                                <img
                                                    src={nextBlueIcon}
                                                    className="img-fluid hvr-icon"
                                                    alt="arrow"
                                                />
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div
                                        className="row  single-doctor"
                                        style={{ paddingLeft: "10%" }}
                                    >
                                        {Array.isArray(follows[0]?.videos) &&
                                            follows[0].videos.filter(data => data.name.includes(searchKey)).map(
                                                (videodata, index) => (
                                                    <div className="col-md-3">
                                                        <div className="theme-block-style">
                                                            {(() => {
                                                                if (
                                                                    payment &&
                                                                    videodata.type ==
                                                                        "paid"
                                                                ) {
                                                                    return (
                                                                        <NavLink
                                                                            to={`/video-detail/${follows[0]?.id}`}
                                                                        >
                                                                            <video
                                                                                width="100%"
                                                                                className="videoHeight"
                                                                                poster={`${baseurl}/storage/${videodata.video.jpg}`}
                                                                            >
                                                                                <source
                                                                                    src={`${baseurl}/storage/${videodata.video}`}
                                                                                    type="video/mp4"
                                                                                />
                                                                            </video>
                                                                        </NavLink>
                                                                    );
                                                                } else if (
                                                                    !payment &&
                                                                    videodata.type ==
                                                                        "paid"
                                                                ) {
                                                                    return (
                                                                        <img
                                                                            src={`${baseurl}/storage/${videodata.video}.jpg`}
                                                                            style={{
                                                                                width:
                                                                                    "100%"
                                                                            }}
                                                                        />
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <NavLink
                                                                            to={`/video-detail/${videodata.id}`}
                                                                        >
                                                                            {localStorage.setItem(
                                                                                "videourl" +
                                                                                    videodata.id,
                                                                                follows[0]
                                                                                    ?.video
                                                                            )}
                                                                            {localStorage.setItem(
                                                                                "videoTitle" +
                                                                                    videodata.id,
                                                                                follows[0]
                                                                                    ?.name
                                                                            )}
                                                                            <video
                                                                                width="100%"
                                                                                className="videoHeight"
                                                                                poster={`${baseurl}/storage/${videodata.video}.jpg`}
                                                                            >
                                                                                <source
                                                                                    src={`${baseurl}/storage/${videodata.video}`}
                                                                                    type="video/mp4"
                                                                                />
                                                                            </video>
                                                                        </NavLink>
                                                                    );
                                                                }
                                                            })()}

                                                            <h4>
                                                                {videodata.name}
                                                            </h4>
                                                            <p style={pStyle}>
                                                                {" "}
                                                                {videodata
                                                                    .description
                                                                    .length > 50
                                                                    ? videodata.description.substring(
                                                                          0,
                                                                          50
                                                                      )
                                                                    : videodata.description}{" "}
                                                                {videodata
                                                                    .description
                                                                    .length > 50
                                                                    ? "..."
                                                                    : ""}
                                                            </p>
                                                            <p className="doctor-subscribe">
                                                                {!payment &&
                                                                videodata.type ==
                                                                    "paid"
                                                                    ? "Subscribe to watch video"
                                                                    : ""}
                                                            </p>
                                                            <ul className="block-style">
                                                                <li
                                                                    onClick={() =>
                                                                        VideoFun(
                                                                            follows[0]
                                                                                ?.id,
                                                                            "like"
                                                                        )
                                                                    }
                                                                >
                                                                    {localStorage.getItem(
                                                                        "likeint" +
                                                                            follows[0]
                                                                                ?.id
                                                                    ) < 2 ? (
                                                                        <img
                                                                            src={
                                                                                likeIcon
                                                                            }
                                                                            className="img-fluid"
                                                                            alt="icon"
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={
                                                                                likeFIllIcon
                                                                            }
                                                                            className="img-fluid"
                                                                            alt="icon"
                                                                        />
                                                                    )}
                                                                    <h6>
                                                                        {
                                                                            follows[0]
                                                                                ?.likes
                                                                        }
                                                                    </h6>
                                                                </li>
                                                                <li
                                                                    onClick={() =>
                                                                        VideoFun(
                                                                            follows[0]
                                                                                ?.id,
                                                                            "share"
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        src={
                                                                            shareIcon
                                                                        }
                                                                        className="img-fluid"
                                                                        alt="icon"
                                                                    />
                                                                    <h6>
                                                                        {
                                                                            follows[0]
                                                                                ?.shares
                                                                        }
                                                                    </h6>
                                                                    <input
                                                                        id={`urlCOyLInk${follows[0]?.id}`}
                                                                        readOnly
                                                                        type="text"
                                                                        className="hideinput"
                                                                        value={
                                                                            baseurl +
                                                                            "/storage/" +
                                                                            follows[0]
                                                                                ?.video
                                                                        }
                                                                    />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                    </div>

                                    <div
                                        class="row mb-2"
                                        style={{ paddingLeft: "10%" }}
                                    >
                                        <div class="col-md-9">
                                            <h2 class="heading-style2">
                                                Medical Publications
                                            </h2>
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                <NavLink
                                                    to="/ViewAllPublications"
                                                    onClick={() =>
                                                        scrollTo(0, 0)
                                                    }
                                                    className="hvr-icon-wobble-horizontal view-all-btn"
                                                >
                                                    View all{" "}
                                                    <img
                                                        src={nextBlueIcon}
                                                        className="img-fluid hvr-icon"
                                                        alt="arrow"
                                                    />
                                                </NavLink>
                                            }
                                        </div>
                                    </div>
                                    <div
                                        class="row"
                                        style={{ paddingLeft: "10%" }}
                                    >
                                        {Array.isArray(
                                            follows[0]?.publications
                                        ) &&
                                            follows[0]?.publications.filter(data => data.name.includes(searchKey)).map(
                                                (data, index) => (
                                                    <div className="col-md-3">
                                                        <div className="theme-block-style medical-list">
                                                            <iframe
                                                                src={`${baseurl}/storage/${data.path}`}
                                                                width="100%"
                                                                height="280"
                                                                frameborder="0"
                                                                allowfullscreen
                                                            ></iframe>
                                                            <NavLink
                                                                to="#"
                                                                data-toggle="modal"
                                                                data-target={
                                                                    "#publicationModal-" +
                                                                    data.id
                                                                }
                                                            >
                                                                <h4>
                                                                    {data.name}
                                                                </h4>
                                                            </NavLink>
                                                            <ul className="block-style">
                                                                <li>
                                                                    {localStorage.getItem(
                                                                        "likeintp" +
                                                                            data.id
                                                                    ) < 2 ? (
                                                                        <img
                                                                            src={
                                                                                likeIcon
                                                                            }
                                                                            className="img-fluid"
                                                                            alt="icon"
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={
                                                                                likeFIllIcon
                                                                            }
                                                                            className="img-fluid"
                                                                            alt="icon"
                                                                        />
                                                                    )}
                                                                    <h6>
                                                                        {
                                                                            data.likes
                                                                        }
                                                                    </h6>
                                                                </li>
                                                                <li>
                                                                    <img
                                                                        src={
                                                                            shareIcon
                                                                        }
                                                                        className="img-fluid"
                                                                        alt="icon"
                                                                    />
                                                                    <h6>
                                                                        {
                                                                            data.shares
                                                                        }
                                                                    </h6>
                                                                    <input
                                                                        id={`urlImgLInk${data.id}`}
                                                                        readOnly
                                                                        type="text"
                                                                        value={
                                                                            baseurl +
                                                                            "/storage/" +
                                                                            data.path
                                                                        }
                                                                        className="hideinput"
                                                                    />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                    <div
                                        class="row mb-2"
                                        style={{ paddingLeft: "10%" }}
                                    >
                                        <div class="col-md-9">
                                            <h2 class="heading-style2">
                                                Masterclasses
                                            </h2>
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                <NavLink
                                                    to="/viewallmasterclasses"
                                                    onClick={() =>
                                                        scrollTo(0, 0)
                                                    }
                                                    className="hvr-icon-wobble-horizontal view-all-btn"
                                                >
                                                    View all{" "}
                                                    <img
                                                        src={nextBlueIcon}
                                                        className="img-fluid hvr-icon"
                                                        alt="arrow"
                                                    />
                                                </NavLink>
                                            }
                                        </div>
                                    </div>
                                    <div
                                        class="row"
                                        style={{ paddingLeft: "10%" }}
                                    >
                                        {Array.isArray(
                                            follows[0]?.masterclasses
                                        ) &&
                                            follows[0]?.masterclasses.filter(data => data.masterclass_title.includes(searchKey)).map(
                                                (doctor, index) => (
                                                    <div className="col-md-3">
                                                        <div className="theme-block-style">
                                                            <NavLink
                                                                to={`/masterclass-detail/${doctor.id}/0`}
                                                            >
                                                                {/* {localStorage.setItem('videourl'+data.id,data.video)}
                                                        {localStorage.setItem('videoTitle'+data.id,data.name)} */}
                                                                <video
                                                                    width="100%"
                                                                    className="videoHeight"
                                                                >
                                                                    <source
                                                                        src={`${baseurl}/storage/${doctor?.subclasses[0]?.path}`}
                                                                        type="video/mp4"
                                                                    />
                                                                </video>
                                                            </NavLink>
                                                            <h4>
                                                                {
                                                                    doctor.masterclass_title
                                                                }
                                                            </h4>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default SocietyDetailsPage;
