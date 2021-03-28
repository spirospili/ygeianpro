<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Doctor;
use App\Models\Video;
use App\Models\File;
use App\Models\Event;
use Illuminate\Http\Request;

class SearchController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $events = Event::when($request->search, function($query)use($request){
            $query->where('name', 'LIKE', '%' . $request->search .'%');
        })->get();
        $videos = Video::when($request->search, function($query)use($request){
            $query->where('name', 'LIKE', '%' . $request->search .'%')
            ->orWhere('tags', 'LIKE', '%'.$request->search.'%');
        })->get();
        $publications = File::when($request->search, function($query)use($request){
            $query->where('name', 'LIKE', '%' . $request->search .'%')
            ->orWhere('tags', 'LIKE', '%'.$request->search.'%');
        })->get();
        $doctors = Doctor::when($request->search, function($query)use($request){
            $query->where('name', 'LIKE', '%' . $request->search .'%')
            ->orWhere('tags', 'LIKE', '%'.$request->search.'%');
        })->get();
        return response()->json([
            'events' => $events, 
            'videos' => $videos, 
            'publications' => $publications,
            'doctors' => $doctors
        ]);
    }

    
}
