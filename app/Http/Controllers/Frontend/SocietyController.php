<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Doctor;
use App\Models\Masterclass;
use App\Models\Subclass;
use App\Models\Society;

use App\Models\Speciality;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SocietyController
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
        
        return response()->json(Society::when($request->page, function($query){
            return $query->inRandomOrder()->limit(2);
        })->get());
       
    }

    /**
     * show the resourse
     */
    public function show($id, Request $request)
    {
        return response()->json(
            Society::where('id', $id)->with(['doctors' => function($q) use ($request){
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


    
}
