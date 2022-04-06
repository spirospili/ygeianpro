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
            // 'video' => 'required',
            'description' => 'nullable|max:1000',
            'thumbnail'=> 'image|mimes:jpeg,jpg,png|required',
            'format'=> 'required',
            'file'=> 'mimes:pdf,ppt.,word,docx,doc'
        ]);

        $subclass=Subclass::create([
            'masterclass_id' => $request->masterclass,
            'video_title' => $request->title,
            'path' => $request->video,
            'description' =>$request->description,
            'thumbnail' =>$request->file('thumbnail') ? $request->file('thumbnail')->store('subclasses', 'public'): null,
            'format' =>$request->format,
            'file' =>$request->file('file') ? $request->file('file')->store('subclasses', 'public'): null
         ]);
         


	$details = [
            'title' => 'Subclass Uploaded',
            'body' => 'New video uploaded by the admin',
            'video' => $subclass,
        ];
        

        return redirect()->route('admin.subclass.index');
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
        $video->thumbnail = $request->file('thumbnail') ? $request->file('thumbnail')->store('subclasses', 'public'): null;
        $video->path = $request->video;
        $video->format = $request->format;
        $video->file =$request->file('file') ? $request->file('file')->store('subclasses', 'public'): null;
        
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
