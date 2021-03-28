<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Doctor;
use App\Models\DoctorImage;
use App\Models\Follower;
use App\Models\User;
use Illuminate\Http\Request;

class DoctorProfileController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        
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
            'doctor_id' => 'required|integer',
        ]);

        if($follower = Follower::where('user_id', auth()->user()->id)->where('doctor_id', $request->doctor_id)->first()){
            $follower->delete();
            return ['message' => 'success'];
        }
        Follower::create([
            'user_id' => auth()->user()->id,
            'doctor_id' => $request->doctor_id,
        ]);
        
        return ['message' => 'success'];
    }

    /**
     * Show the resource
     */
    public function show($id)
    {
        return response()->json(
            Doctor::with(['videos', 'publications', 'images'])->withCount(['followers AS isFollow' => function($query){
                if(auth()->user())
                    return $query->where('user_id', auth()->user()->id);
            }])->withCount('followers')->findOrFail($id)
        );
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
