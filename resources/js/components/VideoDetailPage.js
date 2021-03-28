import React,{useEffect,useState} from 'react'
import InnerPageHeader from './InnerPageHeader';
import { NavLink,useParams } from 'react-router-dom';

function VideoDetailPage() {
  let { id } = useParams();
  const [videoDetail, setVideoDetail] = useState({})
  const videoGet =localStorage.getItem(`videourl${id}`)
  const videoHeading =localStorage.getItem(`videoTitle${id}`)
  useEffect(() => {
    const userObj=JSON.parse(localStorage.getItem('appState'));
    //const userTocken= userObj.user.access_token
    axios.get(`/api/videos/${id}`,{
        headers: {      
            'Accept' : 'application/json',
            //'Authorization': `Bearer ${userTocken}`,
        }}).then(response=> {console.log("doctor follow",response);setVideoDetail(response.data)})
},[])
  return (
    <div>
    	<InnerPageHeader />
      <section className="content-section">
      <div className="col-sm-8 offset-sm-2">
        {videoDetail.video?
      <video width="100%" autoPlay controls>
        <source src={`${baseurl}/storage/${videoDetail.video}`} type="video/mp4" />
      </video>:""}
      <h2 className="heading-style1 text-center">{videoDetail.name} <span></span></h2>
      {/* <ul class="tags">
          <li><a>{videoDetail.tags}</a></li>
      </ul> */}
      <p className="">{videoDetail.description}</p>
      </div>
      </section>
    </div>
  )
}

export default VideoDetailPage
