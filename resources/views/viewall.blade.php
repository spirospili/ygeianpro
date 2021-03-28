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


<header class="relative-header">
		<nav class="navbar navbar-expand-lg static-top">
		  <div class="container">
  		    <a class="navbar-brand main-logo" href="index.html">
		       <img src="{{ asset('html-assets/images/grey-logo.png') }}" class="img-fluid" alt="logo">
		    </a>
		    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
		        <i class="fas fa-grip-lines"></i>
		    </button>
		    <div class="collapse navbar-collapse" id="navbarResponsive">
		      <ul class="navbar-nav w-100">
		        <li class="nav-item">
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
	    			<li><a href="#"><img src="{{ asset('html-assets/images/black-notification.png') }}" class="img-fluid top-notification" alt="notification"></a></li>
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

	<div class="subheader">
		<h1 class="heading-style1">Medical Publications</h1>
	</div><!-- End Sub Header Section -->	

	
	<section class="content-section">
		<div class="container">
			<div class="row">
				
                        @if($videos)
						@foreach($videos as $video)
						<div class="col-md-4 ">
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
</div>
                        @endforeach
                        @else
                            <p>No Videos Uploaded</p>
                        @endif
				
				
			</div>
		</div>
	</section><!-- End Trending Section -->

	
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