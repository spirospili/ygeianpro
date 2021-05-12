<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{ $title ?? 'Dashboard'}}</title>
    <!-- plugins:css -->
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="{{ asset('admin-assets')}}/vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" href="{{ asset('admin-assets')}}/vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{ asset('admin-assets')}}/vendors/css/vendor.bundle.base.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.2/css/uikit.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.24/css/dataTables.uikit.min.css">
    

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script type="text/javascript" charset="utf8"src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js" defer></script>
    
    <script type="text/javascript" charset="utf8"src="https://cdn.datatables.net/1.10.24/js/dataTables.uikit.min.js" ></script>
    <!-- <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script> -->


    <!-- endinject -->
    <!-- Plugin css for this page -->
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="{{ asset('admin-assets')}}/css/vertical-layout-light/style.css">
    <!-- endinject -->
    <link rel="shortcut icon" href="{{ asset('admin-assets')}}/images/favicon.png" />

    <style>
        .progress { position:relative; width:100%; border: 1px solid #7F98B2; padding: 1px; border-radius: 3px; }
        .bar { background-color: #B4F5B4; width:0%; height:25px; border-radius: 3px; }
        .percent { position:absolute; display:inline-block; top:3px; left:48%; color: #7F98B2;}
        #doctorstable { padding: 7%;}
        [data-role="dynamic-fields"] > .form-inline + .form-inline {
                margin-top: 0.5em;
            }

            [data-role="dynamic-fields"] > .form-inline [data-role="add"] {
                display: none;
            }

            [data-role="dynamic-fields"] > .form-inline:last-child [data-role="add"] {
                display: inline-block;
            }

            [data-role="dynamic-fields"] > .form-inline:last-child [data-role="remove"] {
                display: none;
            }
    </style>
</head>

<body class="sidebar-dark">
    <div class="container-scroller">

        @auth
        <!-- partial:../../partials/_navbar.html -->
        <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a class="navbar-brand brand-logo" href="../../index.html"><img src="{{ asset('logo-full.png')}}" class="mr-2" alt="logo" style="height:auto;width:calc(300px - 150px)"/></a>
                <a class="navbar-brand brand-logo-mini" href="../../index.html"><img src="{{ asset('logo-icon.png')}}" alt="logo" /></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="ti-layout-grid2"></span>
                </button>
            
                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item nav-profile dropdown">
                        <!-- <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                        <img src="https://via.placeholder.com/40x40" alt="profile"/>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                        <a class="dropdown-item">
                            <i class="ti-settings text-primary"></i>
                            Settings
                        </a> -->
                        
                        <a class="dropdown-item" href="{{ route('admin.logout') }}"
                            onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();">
                            <i class="ti-power-off text-primary"></i> Logout
                        </a>

                        <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                        
                        </div>
                    </li>
                </ul>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span class="ti-layout-grid2"></span>
                </button>
            </div>
        </nav>
        @endauth
        <!-- partial -->
        <div class="{{ auth()->check() ? 'container-fluid page-body-wrapper' : '' }}">
      
            @auth()
            <!-- partial:../../partials/_sidebar.html -->
            <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('admin.dashboard')}}">
                    <i class="ti-home menu-icon"></i>
                    <span class="menu-title">Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('admin.live.index') }}">
                    <i class="ti-camera menu-icon"></i>
                    <span class="menu-title">Go Live</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('admin.user.index') }}">
                    <i class="ti-user menu-icon"></i>
                    <span class="menu-title">Users</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="{{ route('admin.newsletter') }}">
                        <i class="ti-check-box menu-icon"></i>
                        <span class="menu-title">Subscribe Users</span>
                    </a>
                </li>
                <li class="nav-item {{ request()->segment(2) == 'video' ? 'active' : null }}">
                    <a class="nav-link" data-toggle="collapse" href="#videos" aria-expanded="false" aria-controls="videos">
                    <i class="ti-palette menu-icon"></i>
                    <span class="menu-title">Videos</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse {{ request()->segment(2) == 'video' ? 'show' : null }}" id="videos">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item "> <a class="nav-link {{ request()->segment(3) == 'create' ? 'active' : null }}" href=" {{ route('admin.video.create')  }}">Add New</a></li>
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.video.index') }}">List</a></li>
                    </ul>
                    </div>
                </li>
                <li class="nav-item {{ request()->segment(2) == 'publication' ? 'active' : null }}">
                    <a class="nav-link" data-toggle="collapse" href="#publications" aria-expanded="false" aria-controls="publications">
                    <i class="fa fa-file-pdf-o menu-icon"></i>
                    <span class="menu-title">Publications</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse {{ request()->segment(2) == 'publication' ? 'show' : null }}" id="publications">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.publication.create') }}">Add New</a></li>
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.publication.index') }}">List</a></li>
                    </ul>
                    </div>
                </li>
                <li class="nav-item {{ request()->segment(2) == 'doctor' ? 'active' : null }}">
                    <a class="nav-link" data-toggle="collapse" href="#doctors" aria-expanded="false" aria-controls="doctors">
                    <i class="fa fa-medkit menu-icon"></i>
                    <span class="menu-title">Doctors</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse {{ request()->segment(2) == 'doctor' ? 'show' : null }}" id="doctors">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.doctor.create') }}">Add New</a></li>
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.doctor.index') }}">List</a></li>
                    </ul>
                    </div>
                </li>
                <li class="nav-item {{ request()->segment(2) == 'team' ? 'active' : null }}">
                    <a class="nav-link" data-toggle="collapse" href="#teams" aria-expanded="false" aria-controls="teams">
                    <i class="fa fa-file-pdf-o menu-icon"></i>
                    <span class="menu-title">Teams</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse {{ request()->segment(2) == 'team' ? 'show' : null }}" id="teams">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.team.create') }}">Add New</a></li>
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.team.index') }}">List</a></li>
                    </ul>
                    </div>
                </li>
                <li class="nav-item {{ request()->segment(2) == 'masterclass' ? 'active' : null }}">
                    <a class="nav-link" data-toggle="collapse" href="#masterclass" aria-expanded="false" aria-controls="masterclass">
                    <i class="fa fa-file-pdf-o menu-icon"></i>
                    <span class="menu-title">Masterclass</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse {{ request()->segment(2) == 'masterclass' ? 'show' : null }}" id="masterclass">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.masterclass.create') }}">Add New</a></li>
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.masterclass.index') }}">List</a></li>
                    </ul>
                    </div>
                </li>
                <li class="nav-item {{ request()->segment(2) == 'subclass' ? 'active' : null }}">
                    <a class="nav-link" data-toggle="collapse" href="#subclass" aria-expanded="false" aria-controls="subclass">
                    <i class="fa fa-file-pdf-o menu-icon"></i>
                    <span class="menu-title">Subclass</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse {{ request()->segment(2) == 'subclass' ? 'show' : null }}" id="subclass">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.subclass.create') }}">Add New</a></li>
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.subclass.index') }}">List</a></li>
                    </ul>
                    </div>
                </li>
                <li class="nav-item {{ request()->segment(2) == 'image' ? 'active' : null }}">
                    <a class="nav-link" data-toggle="collapse" href="#images" aria-expanded="false" aria-controls="images">
                    <i class="fa fa-medkit menu-icon"></i>
                    <span class="menu-title">Doctor Images</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse {{ request()->segment(2) == 'image' ? 'show' : null }}" id="images">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.image.create') }}">Add New</a></li>
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.image.index') }}">List</a></li>
                    </ul>
                    </div>
                </li>

                <li class="nav-item {{ request()->segment(2) == 'news' ? 'active' : null }}">
                    <a class="nav-link" data-toggle="collapse" href="#news" aria-expanded="false" aria-controls="news">
                    <i class="fa fa-medkit menu-icon"></i>
                    <span class="menu-title">News</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse {{ request()->segment(2) == 'news' ? 'show' : null }}" id="news">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.news.create') }}">Add New</a></li>
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.news.index') }}">List</a></li>
                    </ul>
                    </div>
                </li>

                <li class="nav-item {{ request()->segment(2) == 'event' ? 'active' : null }}">
                    <a class="nav-link" data-toggle="collapse" href="#events" aria-expanded="false" aria-controls="events">
                    <i class="fa fa-medkit menu-icon"></i>
                    <span class="menu-title">Events</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse {{ request()->segment(2) == 'event' ? 'show' : null }}" id="events">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.event.create') }}">Add New</a></li>
                        <li class="nav-item"> <a class="nav-link" href="{{ route('admin.event.index') }}">List</a></li>
                    </ul>
                    </div>
                </li>
                
                </ul>
            </nav>
            @endauth()
        <!-- partial -->
        <div class="{{ auth()->check() ? 'main-panel': '' }}">
            <div class="content-wrapper">
                @yield('content')
            
            </div>	
          
            <!--<footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                    <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2018 <a href="https://www.urbanui.com/" target="_blank">Urbanui</a>. All rights reserved.</span>
                    <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="ti-heart text-danger ml-1"></i></span>
                </div>
            </footer>-->
        </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
  <!-- plugins:js -->
  <script src="{{ asset('admin-assets')}}/vendors/js/vendor.bundle.base.js"></script>
<script>
$('#video-upload').on('click', function(){
        $('.loading-mask').css('display', 'block');
})
</script>


  <!-- endinject -->
  <!-- Plugin js for this page -->
  <!-- End plugin js for this page -->
  <!-- inject:js -->
  <script src="{{ asset('admin-assets')}}/js/off-canvas.js"></script>
  <script src="{{ asset('admin-assets')}}/js/hoverable-collapse.js"></script>
  <script src="{{ asset('admin-assets')}}/js/template.js"></script>
  <!-- <script src="{{ asset('admin-assets')}}/vendors/jquery-file-upload/jquery.uploadfile.min.js"></script>
  <script src="{{ asset('admin-assets')}}/js/jquery-file-upload.js"></script> -->
  <!-- endinject -->
  <!-- Custom js for this page-->
  <!-- End custom js for this page-->

@yield('scripts')
</body>

</html>
