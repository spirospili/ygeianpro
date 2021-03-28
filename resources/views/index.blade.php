<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="{{ asset('html-assetsassets/images/favicon.png') }}" type="image/png" sizes="18x18">
	<title>Home - YGEIAN</title>
	<!-- <link rel="stylesheet" href="assets/css/bootstrap-grid.min.css"> -->
	<link rel="stylesheet" href="{{ asset('html-assets/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('html-assets/css/font-awesome.css') }}">
	<link rel="stylesheet" href="{{ asset('html-assets/css/slick.css') }}">
	<link rel="stylesheet" href="{{ asset('html-assets/css/animate.css') }}">
	<link rel="stylesheet" href="{{ asset('html-assets/css/style.css') }}">
</head>
<body>
	<header>
		<nav class="navbar navbar-expand-lg static-top">
		  <div class="container">
  		    <a class="navbar-brand main-logo" href="index.html">
		       <img src="{{ asset('html-assets/images/Group1202.png') }}" class="img-fluid" alt="logo">
		    </a>
		    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
		        <i class="fas fa-grip-lines"></i>
		    </button>
		    <div class="collapse navbar-collapse" id="navbarResponsive">
		      <ul class="navbar-nav w-100">
		        <li class="nav-item active">
		          <a class="nav-link" href="index.html">Home</a>                                   
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="#">About Us</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="#">Pricing</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="#">Support</a>
		        </li>
		      </ul>
		    </div>
	    	<div class="right-menu">
	    		<ul>
	    			<li><a href="#"><img src="{{ asset('html-assets/images/notification.png') }}" class="img-fluid top-notification" alt="notification"></a></li>
	    			<li class="navbar-nav-custom user-profile">
					    <div class="dropdown">
					      <img src="{{ asset('html-assets/images/men-1.png') }}" class="img-fluid" alt="profile">	
			              <a href="" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">John Doe <b class="caret"></b></a>
			              <ul class="dropdown-menu" style="display: none;">
			                <li><a href="signup.html">Signup</a></li>
			                <li><a href="#">Profile</a></li>
			                <li><a href="#">Dashboard</a></li>
			              </ul>
			            </div>  
		            </li>
		            <li class="navbar-nav-custom language-dropdown">
					    <div class="dropdown">	
			              <a href="" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">English <b class="caret"></b></a>
			              <ul class="dropdown-menu" style="display: none;">
			                <li><a href="#">Greek</a></li>
			              </ul>
			              <img src="{{ asset('html-assets/images/Untitled1111.png') }}" class="img-fluid" alt="profile">
			            </div>  
		            </li>
	    		</ul>
	    	</div>
		  </div>
		</nav>
	</header><!-- End Header Section -->	

	<section class="main-banner">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-8 text-center">
					<h1>Sed ut perspiciatis unde omnis iste natus</h1>
					<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore.</p>
					<a href="#" class="theme-btn">Start a Free Trial</a>
					<form action="" class="searchbar-style mt-5 mb-5">
						<div class="input-group">
			         		<input type="text" class="form-control" placeholder="Search by keyword">
			         	  	<span class="input-group-btn">
					         <button class="btn" type="submit">Search</button>
					        </span>
			          </div>
					</form>
					<img src="{{ asset('html-assets/images/Group1269.png') }}" class="img-fluid scrolling-img" alt="slider">
				</div>
			</div>
		</div>
	</section><!-- End Main Banner Section -->

	<section class="about-section">
		<div class="container">
			<div class="row justify-content-center text-center">
				<div class="col-md-10">
					<h2 class="heading-style1">About <span>Us</span></h2>
					<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                    <a href="#" class="theme-btn mt-3">More Detail</a>
				</div>
			</div>
		</div>
	</section><!-- End About Section -->

	<section class="trending-section">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-6 trending-block">
					<div class="row mb-2">
						<div class="col-md-9">
							<h2 class="heading-style2">Trending <span>Videos</span></h2>
						</div>
						<div class="col-md-3">
							<a href="videos" class="hvr-icon-wobble-horizontal view-all-btn">View all <img src="{{ asset('html-assets/images/next.png') }}" class="img-fluid hvr-icon" alt="arrow"></a>
						</div>	
					</div>
					<div class="trending-slider">
                        @if($videos)
                        @foreach($videos as $video)
						<div class="theme-block-style">
							<video width="100%" class="trending-video" controls="" >
						        <source src="{{ asset('storage/').'/'.$video->video }}" type="video/mp4">
							</video>
							<h4>{{$video->name}}</h4>
							<ul class="block-style">
								<li>
									<img src="{{ asset('html-assets/images/like.png') }}" class="img-fluid" alt="icon">
									<h6>137</h6>
								</li>
								<li>
									<img src="{{ asset('html-assets/images/share.png') }}" class="img-fluid" alt="icon">
									<h6>200</h6>
								</li>
							</ul>
                        </div>
                        @endforeach
                        @else
                            <p>No Videos Uploaded</p>
                        @endif
					</div>	
				</div>	
				<div class="col-md-6 text-center doctor-block">
					<div class="top-doctor">
						<h2 class="heading-style1">Top <span>Doctors</span></h2>
						<div class="row">
							<div class="col-md-6">
								<img src="{{ asset('html-assets/images/Group1238.png') }}" class="img-fluid" alt="doctor">
								<h5>Neque porro quisquam</h5>
								<p>Sed ut perspiciatis unde omnis iste natus error sit volu ptatem</p>
							</div>
							<div class="col-md-6">
								<img src="{{ asset('html-assets/images/Group1239.png') }}" class="img-fluid" alt="doctor">
								<h5>Neque porro quisquam</h5>
								<p>Sed ut perspiciatis unde omnis iste natus error sit volu ptatem</p>
							</div>
						</div>
					</div>
				</div>	
			</div>
		</div>
	</section><!-- End Trending Section -->

	<section class="medical-publish">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<div class="medical-block">
						<div class="row mb-2">
							<div class="col-md-9">
								<h2 class="heading-style2">Medical <span>Publications</span></h2>
							</div>
							<div class="col-md-3">
								<a href="#" class="hvr-icon-wobble-horizontal view-all-btn">View all <img src="{{ asset('html-assets/images/next-1.png') }}" class="img-fluid hvr-icon" alt="arrow"></a>
							</div>	
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="theme-block-style medical-list">
									<img src="{{ asset('html-assets/images/doc.jpg') }}" class="img-fluid" alt="medical">
									<h4>Neque porro quisquam</h4>
									<ul class="block-style">
										<li>
											<img src="{{ asset('html-assets/images/like.png') }}" class="img-fluid" alt="icon">
											<h6>137</h6>
										</li>
										<li>
											<img src="{{ asset('html-assets/images/share.png') }}" class="img-fluid" alt="icon">
											<h6>200</h6>
										</li>
									</ul>
								</div>
							</div>
							<div class="col-md-6">
								<div class="theme-block-style medical-list">
									<img src="{{ asset('html-assets/images/doc.jpg') }}" class="img-fluid" alt="medical">
									<h4>Neque porro quisquam</h4>
									<ul class="block-style">
										<li>
											<img src="{{ asset('html-assets/images/like.png') }}" class="img-fluid" alt="icon">
											<h6>137</h6>
										</li>
										<li>
											<img src="{{ asset('html-assets/images/share.png') }}" class="img-fluid" alt="icon">
											<h6>200</h6>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="col-md-6">
					<div class="live-operate">
						<div class="row mb-2">
							<div class="col-md-9">
								<h2 class="heading-style2">Live Operations <span>Room</span></h2>
							</div>
							<div class="col-md-3">
								<a href="#" class="hvr-icon-wobble-horizontal float-right view-all-btn">View all <img src="{{ asset('html-assets/images/next-1.png') }}" class="img-fluid hvr-icon" alt="arrow"></a>
							</div>	
						</div>
						<div class="row">
							<div class="col-md-12">
							  <video width="100%" class="live-video" controls="" poster="{{ asset('html-assets/images/live-video.jpg') }}">
						        <source src="{{ asset('html-assets/images/dummy-video.mp4') }}" type="video/mp4">
							  </video>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section><!-- End Medical Publish Section -->

	<footer>
		<div class="container">
			<div class="footer-newsletter">
				<div class="row align-items-center">
					<div class="col-md-6">
						<h3>Subscribe Newsletter</h3>
						<p>Sed ut perspiciatis unde omnis iste natus error sit temto tam rem aperiam.</p>
					</div>
					<div class="col-md-6">
						<form action="" class="subscribe-email">
						  <div class="input-group">
				         		<input type="email" class="form-control" placeholder="Email Id">
				         	  	<span class="input-group-btn">
						         <button class="btn" type="submit"><img src="{{ asset('html-assets/images/send.png') }}" class="img-fluid" alt="email"></button>
						        </span>
				          </div>
						</form>
					</div>
				</div>
			</div>
			<div class="footer-listing">
				<div class="row">
					<div class="col-md-4">
						<img src="{{ asset('html-assets/images/Group1204.png') }}" class="img-fluid footer-logo" alt="logo">
						<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed  ut labore et dolore.</p>
	                    <p>Sed ut  neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,</p>
					</div>
					<div class="col-md-3 pl-5">
						<h4>Our Links</h4>
						<ul>
							<li><a href="feeds.html">Feeds</a></li>
							<li><a href="impressum.html">Impressum</a></li>
							<li><a href="cookies.html">Cookies</a></li>
							<li><a href="#">Contact</a></li>
						</ul>
					</div>
					<div class="col-md-3">
						<h4>Support</h4>
						<ul>
							<li><a href="about.html">About Us</a></li>
							<li><a href="#">Faq's</a></li>
							<li><a href="terms-condition.html">Terms & Condition</a></li>
							<li><a href="privacy-policy.html">Privacy Policy</a></li>
						</ul>
					</div>
					<div class="col-md-2">
						<h4>Follow Us</h4>
						<ul>
							<li><a href="#"><img src="{{ asset('html-assets/images/facebook.png') }}" class="img-fluid" alt="social"> Facebook</a></li>
							<li><a href="#"><img src="{{ asset('html-assets/images/instagram.png') }}" class="img-fluid" alt="social"> Instagram</a></li>
							<li><a href="#"><img src="{{ asset('html-assets/images/you.png') }}" class="img-fluid" alt="social"> YouTube</a></li>
							<li><a href="#"><img src="{{ asset('html-assets/images/twitter.png') }}" class="img-fluid" alt="social"> Twitter</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="copyright text-center">
				<p>Copyright ©2020 Logo. All rights reserved</p>
			</div>
		</div>
	</footer><!-- End Footer -->
  
	<script src="{{ asset('html-assets/js/jquery.js') }}"></script>
	<script src="{{ asset('html-assets/js/bootstrap.min.js') }}"></script>
	<script src="{{ asset('html-assets/js/bootstrap.bundle.min.js') }}"></script>
	<script src="{{ asset('html-assets/js/slick.js') }}"></script>
	<script src="{{ asset('html-assets/js/custom.js') }}"></script>	
</body>
</html>