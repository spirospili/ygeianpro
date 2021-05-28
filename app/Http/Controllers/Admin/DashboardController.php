<?php

namespace App\Http\Controllers\Admin;

use App\Models\Doctor;
use App\Models\Event;
use App\Models\File;
use App\Models\Follower;
use App\Models\News;
use App\Models\User;
use App\Models\Video;
use App\Models\Masterclass;
use Illuminate\Http\Request;
use App\Models\Team;


class DashboardController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('admin.dashboard',[
            'total_doctors' => Doctor::count(),
            'total_users' => User::count(),
            'total_videos' => Video::count(),
            'total_followers' => Follower::count(),
            'total_publishers' => File::count(),
            'total_news' => News::count(),
            'total_video_likes' => Video::sum('likes'),
            'total_events' => Event::count(),
            'total_masterclasses' => Masterclass::count(),
            'total_teams' => Team::count(),
        ]);
    }
}
