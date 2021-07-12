<?php

namespace App\Http\Controllers\Admin;

use App\Models\Doctor;
use App\Models\File as Publication;
use App\Models\Follower;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;

class PublicationController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return view('admin.publication.index', [
            'title' => 'Publications',
            'publications' => Publication::when($request->keywords, function ($query) use ($request){
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
        return view('admin.publication.create', [
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
            'publication' => 'required|mimes:pdf',
        ]);
        $doctor=explode(" ", $request->doctor);

        $publication = Publication::create([
            'name' => $request->title,
            'doctor_id' => $doctor[0] ?? null,
            'tags' => $request->tags ?? null,
            'path' => $request->file('publication')->store('publications', 'public'),
            'hospital_id' => $doctor[1] ?? null
        ]);

        $details = [
            'title' => 'Publication Created',
            'body' => 'New publication uploaded by the admin',
            'publication' => $publication,
        ];
        
        $followers = Follower::where('doctor_id', $request->doctor)->get();
       if ($followers!=null){
        foreach($followers as $follower){
            User::find($follower->user_id)->notify(new PushNotification($details));
        }
    }
        return redirect()->route('admin.publication.index');
    }

    /**
     * Edit the resource
     */
    public function edit($id)
    {
        $publication = Publication::findOrFail($id);
        return view('admin.publication.edit', [
            'publication' => $publication
        ]);
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|min:3|max:100',
            'publication' => 'mimes:pdf|max:5048',
        ]);

        $publication = Publication::findOrFail($id);
        $publication->name = $request->title;
        $publication->tags = $request->tags;

        if($request->file('publication'))
            $publication->path = $request->file('publication')->store('publications', 'public');

        $publication->save();

        return redirect()->route('admin.publication.index');
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        Publication::find($id)->delete();

        return redirect()->back();
    }
}
