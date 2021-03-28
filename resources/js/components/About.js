import React from 'react';
import ReactDom from 'react-dom';
import aboutImg1 from "../../../public/images/surgeons-performing-operation.jpg";
import aboutImg2 from "../../../public/images/national-cancer-institute-KrsoedfRAf4-unsplash.jpg";
import { NavLink } from 'react-router-dom';
import InnerPageHeader from './InnerPageHeader';

const About = () => {
	return (
		<>
			<InnerPageHeader />
			<div className="subheader">
				<h1 className="heading-style1">About Us</h1>
			</div>
			<section className="content-section about-page-content">
				<div className="container">
					<div className="row align-items-center mb-5">
						<div className="col-md-6">
							<img src={aboutImg1} className="img-fluid" alt="about" />
						</div>
						<div className="col-md-6">
							<p>YGEIAN Pro is a multimedia medical company. The best doctors all around the world, from all specialities provide their breakthrough techniques through Live Streaming in the OR from the best hospitals in the world. Recorded Video in 4K and 360. Details are in HD using the best filming techniques.</p>
							<p>We cooperate with the best Medical Journals and we bring the latest medical news for every speciality.</p>
							<p>We provide the ability to attend the best medical congresses internationally via our platform remotely from your house or your place of work. We, additionally, offer the chance to take part in some of the finest courses and seminars provided by the leading medical institutions so as to hone your skills and enrich your knowledge. Furthermore, we give the opportunity to be in operation rooms to participate in surgical procedures in person performed by a surgical team.</p>
						</div>
					</div>
					{/*<div className="row align-items-center">
						<div className="col-md-6">
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
							<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
							<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
						</div>
						<div className="col-md-6">
							<img src={aboutImg2} className="img-fluid" alt="about" />
						</div>
	</div>*/}
				</div>
			</section>
		</>
	)
}

export default About;