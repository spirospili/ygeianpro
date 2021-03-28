<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\VideoLike;
use Illuminate\Http\Request;

class VideoController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only('update');
    }
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $ids = [];
        if($request->auth)
            $ids = VideoLike::whereUserId($request->auth)->get()->pluck('file_id')->toArray();

        return response()->json(Video::when($request->keywords, function ($query) use ($request){
            return $query->where('name', 'LIKE', '%' . $request->keywords .'%')
                ->orWhere('tags', 'LIKE', '%'.$request->keywords.'%');
        })->when($request->page, function($query){
            return $query->limit(2);
        })->latest()->get());
    }

    /**
     * show the resourse
     */
    public function show($id)
    {
        return response()->json(Video::findOrFail($id));
    }    

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $video = Video::find($id);
        if($request->like){
            $video->likes = $video->likes+1;
            VideoLike::create([
                'user_id' => auth()->user()->id,
                'video_id' => $id
            ]);
        } 

        if($request->unlike){
            $video->likes = $video->likes-1;
            VideoLike::whereUserId(auth()->user()->id)->whereVideoId($id)->delete();
        }

        if($request->share)
            $video->shares = $video->shares+1;
        
        $video->save();

        return response()->json(['message' => 'success']);
    }
}
