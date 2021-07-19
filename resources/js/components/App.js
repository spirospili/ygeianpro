import React from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "jquery/dist/jquery.min.js";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick.js";
import Home from './Home';
import About from './About';
import Pricing from './Pricing';
import Footer from './Footer';
import ViewAllVideos from './ViewAllVideos';
import ViewAllDoctors from './ViewAllDoctors';
import ViewAllPublications from './ViewAllPublications';
import ViewAllTeams from './ViewAllTeams';
import ViewAllMasterclasses from './ViewAllMasterclasses';
import ViewAllHospitals from './ViewAllHospitals';
import ViewAllSocieties from './ViewAllSocieties';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Forgot from './Forgot';
import Contact from './Contact';
import News from './News';
import Feed from './Feed';
import Publication from './Publication';
import NewsDetail from './NewsDetail';
import SearchData from './SearchData';
import Calendar from './Calendar';
import EventDetail from './EventDetail';
import Setting from './Setting';
import DoctorDetails from './DoctorDetailPage';
import DoctorVideos from './DoctorVideos';
import DoctorImages from './DoctorImages';
import DoctorDocuments from './DoctorDocuments';
import TeamDetails from './TeamDetails';
import VideoDetailPage from './VideoDetailPage'
import LikedItems from './Liked';
import MostViewed from './MostViewed';
import NotFound from './NotFound'
import Invoice from './Invoice'
import MasterclassDetails from './MasterclassDetails';
import HospitalDetailsPage from './HospitalDetailsPage';
import SocietyDetailsPage from './SocietyDetailsPage';

// import Slick from './Custom';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
	return (
		<>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
				<Route exact path="/pricing" component={Pricing} />
				<Route exact path="/viewallvideos" component={ViewAllVideos} />
				<Route exact path="/viewalldoctors" component={ViewAllDoctors} />
				<Route exact path="/viewallteams" component={ViewAllTeams} />
				<Route exact path="/viewallmasterclasses" component={ViewAllMasterclasses} />
				<Route exact path="/viewallhospitals" component={ViewAllHospitals} />
			    <Route exact path="/viewallsocieties" component={ViewAllSocieties} />	
				<Route exact path="/viewallpublications" component={ViewAllPublications} />
				<Route exact path="/signin" component={SignIn} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/forgot" component={Forgot} />
				<Route exact path="/contact" component={Contact} />
				<Route exact path="/news" component={News} />
				<Route exact path="/feed" component={Feed} />
				<Route exact path="/newsdetail/:id" component={NewsDetail} />
				<Route exact path="/search/:id" component={SearchData} />
				<Route exact path="/calendar" component={Calendar} />
				<Route exact path="/eventdetail/:id" component={EventDetail} />
				<Route exact path="/setting" component={Setting} />
				<Route exact path="/doctor-details/:id" component={DoctorDetails} />
				<Route exact path="/team-details/:id" component={TeamDetails} />
				<Route exact path="/hospital-details/:id" component={HospitalDetailsPage} />
				<Route exact path="/society-details/:id" component={SocietyDetailsPage} />
				<Route exact path="/doctor-videos" component={DoctorVideos} />
				<Route exact path="/doctor-images" component={DoctorImages} />
				<Route exact path="/doctor-documents" component={DoctorDocuments} />
				<Route exact path="/video-detail/:id" component={VideoDetailPage} />
				<Route exact path="/masterclass-detail/:id/:videoID" component={MasterclassDetails} />
 				<Route exact path="/liked" component={LikedItems} />
				<Route exact path="/most-viewed" component={MostViewed} />
				<Route exact path="/publication" component={Publication} />
				<Route exact path="/not-found" component={NotFound} />
				<Route exact path="/invoice" component={Invoice} />
				<Redirect to="/" />
			</Switch>
			<Footer	/>	
		</>
	)
}

export default App;