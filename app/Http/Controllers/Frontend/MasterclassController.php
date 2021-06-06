<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Doctor;
use App\Models\Masterclass;
use App\Models\Subclass;
use App\Models\Curator;
use App\Http\Controllers\Controller;

use App\Models\Speciality;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MasterclassController extends Controller
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
        return response()->json( Masterclass::with(['subclasses' ,'curators'])->when($request->page, function($query){
            return $query->inRandomOrder()->limit(2);
        })->get());

    }

    
    /**
     * Store the request
     */
    public function create()
    {
    
    }
    
    public function show($id, Request $request)
    {
        return response()->json(
            Masterclass::with(['subclasses' => function($q) use ($request){
                $q->when($request->limit == "true", function ($q){
                        $q->limit(3);
                });
            }, 'curators' => function($q) use ($request){
                $q->when($request->limit == "true", function ($q){
                    $q->limit(3);
                });
            }])->findOrFail($id)
        );
    }
    
   
    /**
     * Delete the request
     */
    public function destroy($id)
    {
        
    }
}
