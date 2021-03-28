<?php

namespace App\Http\Controllers\Frontend;

use App\Models\LiveSession;
use Illuminate\Http\Request;

class LiveSessionController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $live_video = LiveSession::whereStatus('started')->limit(1)->orderByDesc('id')->first();

        $video = '';
        $headers = [];
        if($live_video){
            $video = last(explode('/', $live_video->url));
            $video_url = 'https://vimeo.com/'.$video;
            $headers = @get_headers($video_url);
            if($headers[0] == 'HTTP/1.1 404 Not Found')
                $video = '';
        } 

        return response()->json([['live_video' => $video, 'headers' => $headers]]);
        
    }

    /**
     * Store the request
     */
    public function create()
    {
        
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        
    }
}
