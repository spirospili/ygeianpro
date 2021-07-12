<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Doctor;
use App\Models\Masterclass;
use App\Models\Subclass;
use App\Models\Hospital;

use App\Models\Speciality;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HospitalController
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
        
        return response()->json(Hospital::when($request->page, function($query){
            return $query->inRandomOrder()->limit(2);
        })->get());
       
    }

    /**
     * show the resourse
     */
    public function show($id, Request $request)
    {
        return response()->json(
            Hospital::where('id', $id)->with(['doctors' => function($q) use ($request){
                $q->limit(4);
                },'videos' => function($q) use ($request){
                    $q->limit(4);
                }, 'publications' => function($q) use ($request){
                    $q->limit(4);
                },'masterclasses' => function($q) use ($request){
                    $q->with(['subclasses' ,'curators'])->limit(4);
                }])->get());
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
            'name' => 'required|min:3|max:100'

        ]);
        $hospital = Hospital::create([
            'hospital_name' => $request->name,
            'path' => $request->file('logo') ? $request->file('logo')->store('hospitals', 'public'): null
        ]);
        
        

        $details = [
            'title' => 'Hospital Created',
            'body' => 'New hospital created  by the admin',
            'doctor' => $hospital,
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
        $request->validate
        ([
            'name' => 'required|min:3|max:100', 
        ]);

        $masterclass = Masterclass::findOrFail($id)->update(['masterclass_title' => $request->name, 'speciality' => $request->speciality]);
       
        Curator::where('masterclass_id', $id)->delete();
            foreach($request->curators as $curator)
            {
                Curator::create([
                    'masterclass_id' => $id,
                    'doctor_id' => $curator
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
