<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Doctor;
use App\Models\Team;
use App\Models\Masterclass;
use App\Models\DoctorImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Follower;

class DoctorController extends Controller
{
    /**
     * Enforce middleware.
     */
    public function __construct()
    {
        if (array_key_exists('HTTP_AUTHORIZATION', $_SERVER)) {
            //$this->middleware('auth:api');
            $this->middleware('auth:api', ['only' => ['store', 'show','show_team']]);
        }
        
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return response()->json(Doctor::when($request->keywords, function ($query) use ($request){
            return $query->where('name', 'LIKE', '%' . $request->keywords .'%')
                ->orWhere('tags', 'LIKE', '%'.$request->keywords.'%');
        })->when($request->page, function($query){
            return $query->inRandomOrder()->limit(2);
        })->latest()->get());
    }

    /**
     * Store the request
     */
    public function create()
    {
    
    }

    /**
     * show the resourse
     */
    public function show($id, Request $request)
    {


        return response()->json(
            Doctor::with(['videos' => function($q) use ($request){
                $q->when($request->limit == "true", function ($q){
                        $q->limit(3);
                });
            }, 'publications' => function($q) use ($request){
                $q->when($request->limit == "true", function ($q){
                    $q->limit(3);
                });
            }, 'images' => function($q) use ($request){
                $q->when($request->limit == "true", function ($q){
                    $q->limit(3);
                });
            }, 'curators' , 'Team_Doctors'])->withCount(['followers AS isFollow' => function($query){
                if(auth()->user())
                    return $query->where('user_id', auth()->user()->id);
                else
                    return $query->where('user_id', 0);
            }])->withCount('followers')->findOrFail($id)
        );
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
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $image = DoctorImage::findOrFail($id);
        if($request->like)
            $image->likes = $image->likes+1;
            /*PublicationLike::create([
                'user_id' => auth()->user()->id,
                'file_id' => $id
            ]);*/

        if($request->share)
            $image->shares = $image->shares+1;
        
        $image->save();

        return response()->json(['message' => 'success']);
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        
    }
}
