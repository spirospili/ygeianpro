<?php

namespace App\Http\Controllers\Admin;

use App\Models\Doctor;
use App\Models\DoctorImage;
use Illuminate\Http\Request;

class DoctorImageController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return view('admin.image.index', [
            'title' => 'Doctor Image',
            'images' => DoctorImage::when($request->keywords, function ($query) use ($request){
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
        return view('admin.image.create', [
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
            'doctor' => 'required|numeric|exists:doctors,id',
            'image' => 'required|mimes:jpeg,jpg,png',
            'description' => 'nullable|max:1000'
        ]);
        $doctor = Doctor::findOrFail($request->doctor);

        DoctorImage::create([
            'name' => $request->title,
            'doctor_id' => $request->doctor ?? null,
            'tags' => $request->tags ?? null,
            'description' => $request->description,
            'image' => $request->file('image')->store('doctor_images', 'public'),
            'speciality'=> $doctor->speciality
        ]);

        return redirect()->route('admin.image.index');
    }

    /**
     * Edit the resource
     */
    public function edit($id)
    {
        $image = DoctorImage::findOrFail($id);
        $doctors = Doctor::all();
        return view('admin.image.edit', [
            'image' => $image,
            'doctors' => $doctors
        ]);
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $doctor = Doctor::findOrFail($request->doctor);
        
        $image = DoctorImage::findOrFail($id);
        $image->name = $request->title;
        $image->tags = $request->tags;
        $image->description = $request->description;
        $image->speciality = $doctor->speciality;
        if($request->file('video'))
            $image->image = $request->file('image')->store('doctor_images', 'public'); 
        $image->save();

        return redirect()->route('admin.image.index');
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        DoctorImage::find($id)->delete();

        return redirect()->back();
    }
}
