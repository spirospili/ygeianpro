<?php

namespace App\Http\Controllers\Admin;

use App\Models\Masterclass;
use App\Models\Subclass;
use App\Models\Doctor;
use App\Models\Follower;
use App\Models\Video;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;

class SubclassController
{
    
     /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return view('admin.subclass.index', [
            'videos' => Subclass::when($request->keywords, function ($query) use ($request){
                return $query->where('video_title', 'LIKE', '%' . $request->keywords .'%');
            })->latest()->get()
        ]);
    }

    /**
     * Store the request
     */
    public function create()
    {
        $Masterclasses = Masterclass::all();
        return view('admin.subclass.create', [
            'Masterclasses' => $Masterclasses,
        ]);
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|max:100',
            'masterclass' => 'required|numeric',
            'video' => 'required',
            'description' => 'nullable|max:1000'
        ]);

        $subclass=Subclass::create([
            'masterclass_id' => $request->masterclass,
            'video_title' => $request->title,
            'path' => $request->file('video')->store('masterclaseses', 'public'),
            'description' =>$request->description,
         ]);
         $video_path = "http://localhost:8000/storage/".$subclass->path;
                 //$path = "storage/".explode('.', $video->video)[0].".jpg";
             $path = "storage/".$subclass->path.".jpg";
                 //$shell = shell_exec("ffmpeg -i http://www.ygeianpro.com/storage/".$video->video." -ss 00:00:01.000 -vframes 1 http://ygeianpro.com/storage/". explode('.', $video->video)[0].".jpg");
                 $exec = exec("ffmpeg -i $video_path -ss 00:00:01.000 -vframes 1 $path 2>&1");
                 //$new = shell_exec("ffmpeg -i $video_path -ss 00:00:01 -vframes 1 $path 2>&1");
         //dd($exec);


	$details = [
            'title' => 'Subclass Uploaded',
            'body' => 'New video uploaded by the admin',
            'video' => $subclass,
        ];
        

        return redirect()->route('admin.video.index');
    }

    /**
     * Edit the resource
     */
    public function edit($id)
    {
        $video = Subclass::findOrFail($id);
        $masterclasses = Masterclass::all();
        return view('admin.subclass.edit', [
            'video' => $video,
            'masterclasses' => $masterclasses
        ]);
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $video = Subclass::findOrFail($id);
        $video->video_title = $request->title;
        $video->description = $request->description;
        if($request->file('video'))
            $video->path = $request->file('video')->store('masterclasses', 'public'); 
        $video->save();

        return redirect()->route('admin.subclass.index');
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        Subclass::find($id)->delete();

        return redirect()->back();
    }
}
