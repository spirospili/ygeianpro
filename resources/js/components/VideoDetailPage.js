import React, { useEffect, useState } from "react";
import InnerPageHeader from "./InnerPageHeader";
import { NavLink, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

function VideoDetailPage() {
    let { id } = useParams();
    const [videoDetail, setVideoDetail] = useState({});
    const videoGet = localStorage.getItem(`videourl${id}`);
    const videoHeading = localStorage.getItem(`videoTitle${id}`);

    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem("appState"));
        //const userTocken= userObj.user.access_token
        axios
            .get(`/api/videos/${id}`, {
                headers: {
                    Accept: "application/json"
                    //'Authorization': `Bearer ${userTocken}`,
                }
            })
            .then(response => {
                console.log("doctor follow", response);
                setVideoDetail(response.data);
                console.log("VideoDeatal", response.data.video.match(/\d/g))
            });
    }, []);

    // This is a function which can tell if a vlaue contains characters a-z or not
    function stringContainer(value) {
      const val = value.match(/[A-Z, a-z]/g);
      if (val === null) {
        return false
      }
      return true
    }

    return (
        <div>
            <InnerPageHeader />
            <section className="content-section">
                <div className="col-sm-8 offset-sm-2">

                  {videoDetail.video ? (
                    stringContainer(videoDetail.video) === false ? (
                      <ReactPlayer width="100%" url={"https://www.vimeo.com/" + videoDetail.video} controls={true} />
                    ) : (<ReactPlayer
                      width="100%"
                      url={
                          "https://www.youtube.com/watch?v=" +
                          videoDetail.video
                      }
                      controls={true}
                  />)
                  ) : ("")}

                    

                    {/* // {videoDetail.video ? (
                    {/* //     <ReactPlayer */}
                    {/* //         width="100%" */}
                    {/* //         url={ */}
                    {/* //             "https://www.youtube.com/watch?v=" +
                    //             videoDetail.video
                    //         }
                    //         controls={true}
                    //     />
                    // ) : (
                    //     ""
                    // )} */} 
                    <h2 className="heading-style1 text-center">
                        {videoDetail.name} <span></span>
                    </h2>
                    {/* <ul class="tags">
          <li><a>{videoDetail.tags}</a></li>
      </ul> */}
                    <p className="">{videoDetail.description}</p>
                </div>
            </section>
        </div>
    );
}

export default VideoDetailPage;
