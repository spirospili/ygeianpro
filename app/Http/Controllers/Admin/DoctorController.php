<?php

namespace App\Http\Controllers\Admin;

use App\Models\Doctor;
use App\Models\Speciality;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DoctorController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return view('admin.doctor.index', [
            'title' => 'Doctor',
            'doctors' => Doctor::when($request->keywords, function ($query) use ($request){
                return $query->where('name', 'LIKE', '%' . $request->keywords .'%');
            })->latest()->get()
        ]);
    }

    
    /**
     * Store the request
     */
    public function create()
    {
        return view('admin.doctor.create',[
            'specialities' => DB::table('speciality')->get(),
            'hospitals' => DB::table('hospitals')->get(),
            'societies' => DB::table('society')->get()
        ]);
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
            'academicskills' => $request->academicskills,
            'professionalskills' => $request->professionalskills,
            'milestones' => $request->milestones,
            'logo' => $request->file('logo') ? $request->file('logo')->store('doctors', 'public'): null,
            'hospital_id' => $request->hospital ?? null,
            'society_id' => $request->society ?? null, 

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
            'doctor' => $doctor,
            'hospitals' => DB::table('hospitals')->get(),
            'societies' => DB::table('society')->get()
            
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
        $doctor->academicskills = $request->academicskills;
        $doctor->professionalskills = $request->professionalskills;
        $doctor->milestones = $request->milestones;
        $doctor->tags = $request->tags ?? null;
        $doctor->speciality = $request->speciality ?? null;
        $doctor->hospital_id = $request->hospital ?? null;
        $doctor->society_id = $request->society ?? null;

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
        Doctor::find($id)->delete();

        return redirect()->back();
    }
}
