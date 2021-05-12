<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Doctor;
use App\Models\Team;
use App\Models\Video;
use App\Models\File;
use App\Models\Event;
use App\Models\Masterclass;
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
            ->orWhere('tags', 'LIKE', '%'.$request->search.'%')
            ->orWhere('speciality', 'LIKE', '%'.$request->search.'%');
        })->get();
        $teams = Team::when($request->search, function($query)use($request){
            $query->join('doctors', 'doctors.id','=','teams.TeamLead_id')
            ->where('team_name', 'LIKE', '%' . $request->search .'%')
            ->orWhere('speciality', 'LIKE', '%'.$request->search.'%')
            ->orWhere('name', 'LIKE', '%'.$request->search.'%');
        })->get();
        

        $masterclasses=Masterclass::with(['subclasses'])->where('masterclass_title', 'LIKE', '%' . $request->search .'%')->limit(3)->get();

        return response()->json([
            'events' => $events, 
            'videos' => $videos, 
            'publications' => $publications,
            'doctors' => $doctors,
            'teams' => $teams,
            'masterclasses' => $masterclasses,
        ]);
    }

    
}
