@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:rgb(10, 143, 220);color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total Users</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{ $total_users }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>   
    
    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:rgb(0, 181, 156);color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total Doctors</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{ $total_doctors }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>

    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:rgb(183, 69, 255);color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total Videos</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" >{{ $total_videos }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>

    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:rgb(247, 117, 104);color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total Publishers</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{ $total_publishers }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>

    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:rgb(253, 58, 132);color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total Events</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{ $total_events }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>

    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:rgb(38, 94, 215);color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total News</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{ $total_news }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>

    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:#dc3ccc;color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total Video Likes</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{ $total_video_likes }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>

    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:#ffab2d;color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total Followers</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{ $total_followers }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>

    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:#ffab2d;color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total Masterclasses</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{ $total_masterclasses }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>

    <div class="col-md-3 grid-margin stretch-card">
        <div class="card" style="background:#ffab2d;color:#fff">
            <div class="card-body">
                <p class="card-title text-md-center text-xl-left" style="color:#fff!important">Total Teams</p>
                <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{{ $total_teams }}</h3>
                <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0" style="color:#fff!important"></i>
                </div>  
                <!-- <p class="mb-0 mt-2 text-warning">2.00% <span class="text-black ml-1"><small>(30 days)</small></span></p> -->
            </div>
        </div>
    </div>
</div>
					
@endsection