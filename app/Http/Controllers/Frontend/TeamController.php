<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Team;
use App\Models\Team_Doctors;
use App\Models\Doctor;
use App\Models\Speciality;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamController
{
    
    /**
     * Enforce middleware.
     */
    public function __construct()
    {
        if (array_key_exists('HTTP_AUTHORIZATION', $_SERVER)) {
            //$this->middleware('auth:api');
            $this->middleware('auth:api', ['only' => ['show']]);
        }
        
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
       
        return response()->json(Team::when($request, function($query)use($request){
            $query->join('doctors', 'doctors.id','=','teams.TeamLead_id');
        })->when($request->page, function($query){
            return $query->inRandomOrder()->limit(2);
        })->get());
    }

    /**
     * show the resourse
     */
    public function show($id, Request $request)
    {
        return response()->json(
            Team::where('teams.team_id', $id)
            ->join('team_doctors','team_doctors.team_id','=','teams.team_id')
            ->join('doctors', 'teams.TeamLead_id','=', 'doctors.id')
            ->get());
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
        $request->validate([
            'name' => 'required|min:3|max:100',
            'doctor' => 'required|image|mimes:jpeg,jpg,png',
            'logo'=> 'image|mimes:jpeg,jpg,png',
            'description' => 'nullable|max:1000', 
            'tags'=>'required',
            'speciality'=>'required'
        ], [
            'doctor.required' => 'Upload doctor image',
            'doctor.image' => 'The file must be an image',

        ]);
        
        $doctor = Doctor::create([
            'name' => $request->name,
            'path' => $request->file('doctor')->store('doctors', 'public'),
            'description' => $request->description,
            'tags' => $request->tags ?? null,
            'subspeciality' => $request->subspeciality,
            'speciality' => $request->speciality ?? null,
            'logo' => $request->file('logo') ? $request->file('logo')->store('doctors', 'public'): null
        ]);

        $details = [
            'title' => 'Doctor Created',
            'body' => 'New doctor created  by the admin',
            'doctor' => $doctor,
        ];
        
        $users = User::all();
        foreach($users as $user){
            $user->notify(new PushNotification($details));
        }
        
        return redirect()->route('admin.doctor.index');
    }

    /** Edit the resource */
    public function edit($id)
    {
        $doctor = Doctor::findOrFail($id);
        
        return view('admin.doctor.edit', [
            'doctor' => $doctor
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
            'description' => 'nullable|max:1000', 
        ]);

        $doctor = Doctor::findOrFail($id);
        $doctor->name = $request->name;
        if($request->file('doctor'))
            $doctor->path = $request->file('doctor')->store('doctors', 'public');

        $doctor->description = $request->description;
        $doctor->tags = $request->tags ?? null;
        $doctor->speciality = $request->speciality ?? null;
        if($request->file('logo'))
            $doctor->logo = $request->file('logo')->store('doctors', 'public');
        $doctor->save();
        return redirect()->route('admin.doctor.index');
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        Team::find($id)->delete();

        return redirect()->back();
    }
}
