<?php

namespace App\Http\Controllers\Admin;

use App\Models\Doctor;
use App\Models\Masterclass;
use App\Models\Subclass;
use App\Models\Curator;

use App\Models\Speciality;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MasterclassController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return view('admin.masterclass.index', [
            'title' => 'Masterclass',
            'masterclasses' => Masterclass::when($request->keywords, function ($query) use ($request){
                return $query->where('masterclass_title', 'LIKE', '%' . $request->keywords .'%');
            })->latest()->get()
        ]);
    }

    
    /**
     * Store the request
     */
    public function create()
    {
        return view('admin.masterclass.create',[
            'specialities' => DB::table('speciality')->get(),
            'doctors' => DB::table('doctors')->get()
        ]);
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:100',
            'videos' => 'required',
            'video_title' => 'required',

        ]);
        $masterclass = Masterclass::create([
            'masterclass_title' => $request->name,
            'speciality' => $request->speciality,
        ]);
        
        $count=0;
        foreach($request->file("videos") as $video)
        {
               $subclass=Subclass::create([
                   'masterclass_id' => $masterclass->id,
                   'video_title' => $request->video_title[$count],
                   'path' => $video->store('masterclaseses', 'public'),
                   'description' =>$request->description[$count],
                ]);
                $video_path = "http://localhost:8000/storage/".$subclass->path;
                        //$path = "storage/".explode('.', $video->video)[0].".jpg";
                    $path = "storage/".$subclass->path.".jpg";
                        //$shell = shell_exec("ffmpeg -i http://www.ygeianpro.com/storage/".$video->video." -ss 00:00:01.000 -vframes 1 http://ygeianpro.com/storage/". explode('.', $video->video)[0].".jpg");
                        $exec = exec("ffmpeg -i $video_path -ss 00:00:01.000 -vframes 1 $path 2>&1");
                        //$new = shell_exec("ffmpeg -i $video_path -ss 00:00:01 -vframes 1 $path 2>&1");
                //dd($exec);
                $count++;
        }
        foreach($request->curators as $curator)
        {
               Curator::create([
                   'masterclass_id' => $masterclass->id,
                   'doctors_id' => $curator
                ]);
                
        }
        

        $details = [
            'title' => 'Doctor Created',
            'body' => 'New doctor created  by the admin',
            'doctor' => $masterclass,
        ];
        
        $users = User::all();
        foreach($users as $user){
            $user->notify(new PushNotification($details));
        }
        
        return redirect()->route('admin.masterclass.index');
    }

    /** Edit the resource */
    public function edit($id)
    {
        $masterclass = Masterclass::with(['subclasses', 'curators'])->findOrFail($id);
        
        return view('admin.masterclass.edit', [
            'masterclass' => $masterclass,
            'doctors' => DB::table('doctors')->get()
        ], [
            'specialities' => DB::table('speciality')->get()
        ]);
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|min:3|max:100', 
        ]);

        $masterclass = Masterclass::findOrFail($id)->update(['masterclass_title' => $request->name, 'speciality' => $request->speciality]);
        if($request->file("videos"))
        {
        $count=0;
        foreach($request->file("videos") as $video)
         {
               $subclass=Subclass::create([
                   'masterclass_id' => $masterclass->id,
                   'video_title' => $request->video_title[$count],
                   'path' => $video->store('masterclaseses', 'public'),
                   'description' =>$request->description[$count],
                ]);
                $video_path = "http://localhost:8000/storage/".$subclass->path;
                        //$path = "storage/".explode('.', $video->video)[0].".jpg";
                    $path = "storage/".$subclass->path.".jpg";
                        //$shell = shell_exec("ffmpeg -i http://www.ygeianpro.com/storage/".$video->video." -ss 00:00:01.000 -vframes 1 http://ygeianpro.com/storage/". explode('.', $video->video)[0].".jpg");
                        $exec = exec("ffmpeg -i $video_path -ss 00:00:01.000 -vframes 1 $path 2>&1");
                        //$new = shell_exec("ffmpeg -i $video_path -ss 00:00:01 -vframes 1 $path 2>&1");
                //dd($exec);
                $count++;
         }
        }
        Curator::where('masterclass_id', $id)->delete();
            foreach($request->curators as $curator)
            {
                Curator::create([
                    'masterclass_id' => $id,
                    'doctors_id' => $curator
                    ]);            
            }
        
    
        return redirect()->route('admin.masterclass.index');
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        Masterclass::find($id)->delete();
        Curator::where('masterclass_id', $id)->delete();
        Subclass::where('masterclass_id', $id)->delete();
        return redirect()->back();
    }
}
