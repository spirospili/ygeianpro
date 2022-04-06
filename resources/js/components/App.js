import React, { useState, useContext} from 'react';
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

import AuthContext from '../store/AuthContext2';

// import Slick from './Custom';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
		const authCtx = useContext(AuthContext);
		const {isAuthenticated} = authCtx;

		console.log("From App", isAuthenticated);

	return (
		<>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
				<Route exact path="/pricing" component={Pricing} />
				<Route exact path="/contact" component={Contact} />
				<Route exact path="/forgot" component={Forgot} />
				<Route exact path="/not-found" component={NotFound} />
				{!isAuthenticated && <Route path="/signin" exact component={SignIn} />}
				{isAuthenticated && <Route path="/signin"><Redirect to="/feed" /></Route>}
				{!isAuthenticated && <Route path="/signup" exact component={SignUp} />}
				{isAuthenticated && <Route path="/signup"><Redirect to="/feed" /></Route>}
				{!isAuthenticated && <Route path="/viewallvideos"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/viewallvideos" exact component={ViewAllVideos} />}
				{!isAuthenticated && <Route path="/viewalldoctors"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/viewalldoctors" exact component={ViewAllDoctors}></Route>}
				{!isAuthenticated && <Route path="/viewallteams"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/viewallteams" exact component={ViewAllTeams}></Route>}
				{!isAuthenticated && <Route path="/viewallmasterclasses"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/viewallmasterclasses" exact component={ViewAllMasterclasses} />}
				{!isAuthenticated && <Route path="/viewallhospitals"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/viewallhospitals" exact component={ViewAllHospitals} />}
				{!isAuthenticated && <Route path="/viewallsocieties"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/viewallsocieties" exact component={ViewAllSocieties} />}
				{!isAuthenticated && <Route path="/viewallpublications"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/viewallpublications" exact component={ViewAllPublications} />}
				{!isAuthenticated && <Route path="/news"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/news" exact component={News} />}
				{!isAuthenticated && <Route path="/feed"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/feed" exact component={Feed} />}
				{!isAuthenticated && <Route path="/newsdetail/:id"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/newsdetail/:id" exact component={NewsDetail} />}
				{!isAuthenticated && <Route path="/search/:id"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/search/:id" exact component={SearchData} />}
				{!isAuthenticated && <Route path="/calendar"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/calendar" exact component={Calendar} />}
				{!isAuthenticated && <Route path="/eventdetail/:id"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/eventdetail/:id" exact component={EventDetail} />}
				{!isAuthenticated && <Route path="/setting"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/setting" exact component={Setting} />}
				{!isAuthenticated && <Route path="/doctor-details/:id"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/doctor-details/:id" exact component={DoctorDetails} />}
				{!isAuthenticated && <Route path="/team-details/:id"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/team-details/:id" exact component={TeamDetails} />}
				{!isAuthenticated && <Route path="/hospital-details/:id"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/hospital-details/:id" exact component={HospitalDetailsPage} />}
				{!isAuthenticated && <Route path="/society-details/:id"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/society-details/:id" exact component={SocietyDetailsPage} />}
				{!isAuthenticated && <Route path="/doctor-videos"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/doctor-videos" exact component={DoctorVideos} />}
				{!isAuthenticated && <Route path="/doctor-images"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/doctor-images" exact component={DoctorImages} />}
				{!isAuthenticated && <Route path="/doctor-documents"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/doctor-documents" exact component={DoctorDocuments} />}
				{!isAuthenticated && <Route path="/video-detail/:id"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/video-detail/:id" exact component={VideoDetailPage} />}
				{!isAuthenticated && <Route path="/masterclass-detail/:id/:videoID"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/masterclass-detail/:id/:videoID" exact component={MasterclassDetails} />}
				{!isAuthenticated && <Route path="/liked"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/liked" exact component={LikedItems} />}
				{!isAuthenticated && <Route path="/most-viewed"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/most-viewed" exact component={MostViewed} />}
				{!isAuthenticated && <Route path="/publication"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/publication" exact component={Publication} />}
				{!isAuthenticated && <Route path="/invoice"><Redirect to="/signin" /></Route>}
				{isAuthenticated && <Route path="/invoice" exact component={Invoice} />}
				<Route path="*">
					<Redirect to="/" />
				</Route>
			</Switch>
			<Footer	/>	
		</>
	)
}

export default App;