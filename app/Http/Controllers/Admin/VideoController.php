<?php

namespace App\Http\Controllers\Admin;

use App\Models\Doctor;
use App\Models\Follower;
use App\Models\Video;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;

class VideoController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return view('admin.video.index', [
            'title' => 'Go Live',
            'videos' => Video::when($request->keywords, function ($query) use ($request){
                return $query->where('name', 'LIKE', '%' . $request->keywords .'%');
            })->latest()->get()
        ]);
    }

    /**
     * Store the request
     */
    public function create()
    {
        $doctors = Doctor::all();
        return view('admin.video.create', [
            'doctors' => $doctors,
        ]);
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|max:100',
            'doctor' => 'required',
            'video' => 'required',
            'description' => 'nullable|max:1000'
        ]);
        $doctor=explode(" ", $request->doctor);
        $add = Doctor::findOrFail($doctor[0]);

        $video = Video::create([
            'name' => $request->title,
            'doctor_id' => $doctor[0] ?? null,
            'tags' => $request->tags ?? null,
            'description' => $request->description,
            'video' => $request->video,
            'type' => $request->type,
            'hospital_id' => $doctor[1] ?? null,
            'speciality' => $add->speciality
            ]);

// 	$video_path = "http://www.ygeianpro.com/storage/".$video->video;
//         //$path = "storage/".explode('.', $video->video)[0].".jpg";
// 	$path = "storage/".$video->video.".jpg";
//         //$shell = shell_exec("ffmpeg -i http://www.ygeianpro.com/storage/".$video->video." -ss 00:00:01.000 -vframes 1 http://ygeianpro.com/storage/". explode('.', $video->video)[0].".jpg");
//         $exec = exec("ffmpeg -i $video_path -ss 00:00:01.000 -vframes 1 $path 2>&1");
//         //$new = shell_exec("ffmpeg -i $video_path -ss 00:00:01 -vframes 1 $path 2>&1");
// //dd($exec);

	$details = [
            'title' => 'Video Uploaded',
            'body' => 'New video uploaded by the admin',
            'video' => $video,
        ];
        
        $followers = Follower::where('doctor_id', $request->doctor)->get();
        foreach($followers as $follower){
            if($user = User::find($follower->user_id))
                $user->notify(new PushNotification($details));
        }

        return redirect()->route('admin.video.index');
    }

    /**
     * Edit the resource
     */
    public function edit($id)
    {
        $video = Video::findOrFail($id);
        $doctors = Doctor::all();
        return view('admin.video.edit', [
            'video' => $video,
            'doctors' => $doctors
        ]);
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $video = Video::findOrFail($id);
        $video->name = $request->title;
        $video->tags = $request->tags;
        $video->description = $request->description;
        if($request->video)
            $video->video = $request->video; 
        $video->save();

        return redirect()->route('admin.video.index');
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        Video::find($id)->delete();

        return redirect()->back();
    }
}
